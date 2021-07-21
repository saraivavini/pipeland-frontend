import { computed } from "mobx";
import {
  model,
  Model,
  prop,
  modelFlow,
  _async,
  _await,
  modelAction,
  createContext,
} from "mobx-keystone";
import { api } from "../../services/api/api";
import { SessionMap } from "../../services/mapper/SessionMap";
import utils from "../../utils";
import { load, remove, save } from "../../utils/storage";
import { Session } from "./session";
import { User } from "./user";

interface isLoading {
  login: boolean;
  signUp: boolean;
  loadSession: boolean;
}

@model("pipeland/SessionsStore")
export class SessionsStore extends Model({
  activeSession: prop<Session | null>(() => null),
  isLoading: prop<isLoading>(() => ({
    login: false,
    signUp: false,
    loadSession: false,
  })),
  errorMessage: prop<string | null>(() => null).withSetter(),
}) {
  @computed
  get isTeacher() {
    return this.activeSession?.user?.role === "TEACHER";
  }

  @modelFlow
  signIn = _async(function* (
    this: SessionsStore,
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    }
  ) {
    this.isLoading.login = true;
    this.errorMessage = null;

    try {
      const session = yield* _await(
        api.login({
          email,
          password,
        })
      );

      this.activeSession = SessionMap.toMobxInstance(session);

      // const token = getSnapshot(session.token);
      // const user = getSnapshot(session.user);

      save("@pipeland:token", session.token);
      save("@pipeland:userId", session.user?.id);
    } catch (error: any) {
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.login = false;
    }
  });

  @modelFlow
  signUp = _async(function* (
    this: SessionsStore,
    {
      name,
      email,
      password,
      role,
    }: {
      name: string;
      email: string;
      password: string;
      role: string;
    }
  ) {
    this.isLoading.signUp = true;
    this.errorMessage = null;

    try {
      yield* _await(
        api.signUp({
          email,
          password,
          name,
          role,
        })
      );

      yield* _await(
        this.signIn({
          email,
          password,
        })
      );
    } catch (error: any) {
      let errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      this.errorMessage = errorMessage;
    } finally {
      this.isLoading.signUp = false;
    }
  });

  @modelFlow
  logout = _async(function* (this: SessionsStore) {
    this.activeSession = null;

    yield* _await(
      Promise.all([remove("@pipeland:token"), remove("@pipeland:user")])
    );
  });

  @modelFlow
  loadSessionInfo = _async(function* (this: SessionsStore) {
    this.isLoading.loadSession = true;

    const token = yield* _await(load("@pipeland:token"));
    const userId = yield* _await(load("@pipeland:userId"));

    try {
      if (!!token && !!userId) {
        api.axios.defaults.headers.authorization = `Bearer ${token}`;

        const user = yield* _await(api.fetchSessionInfo());

        this.activeSession = SessionMap.toMobxInstance({
          user,
          token: String(token),
        });
      }
    } catch (error: any) {
      let errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      this.setErrorMessage(errorMessage);
    } finally {
      this.isLoading.loadSession = false;
    }
  });

  @modelAction
  clearErrors = () => {
    this.errorMessage = null;
  };
}
