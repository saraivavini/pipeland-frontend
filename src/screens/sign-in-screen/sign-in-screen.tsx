import { observer } from "mobx-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import { Box } from "../../components/box";
import { Button } from "../../components/button";
import { Icon } from "../../components/icon";
import { Input } from "../../components/input";
import { Text } from "../../components/text";
import { useStores } from "../../store";

interface IFormData {
  email: string;
  password: string;
}

const SignInScreen: React.FC = observer(() => {
  const { sessionsStore } = useStores();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit = handleSubmit(async (data: IFormData) => {
    await sessionsStore.signIn({
      email: data.email,
      password: data.password,
    });

    if (!sessionsStore.errorMessage) {
      history.push("/my-classes");
    }
  });

  if (!!sessionsStore.activeSession?.user) {
    return <Redirect to="/my-classes" />;
  }

  return (
    <Box flex={1}>
      <Box
        display="flex"
        justifyContent="center"
        height="100vh"
        padding={6}
        borderRadius="8px"
      >
        <Box
          backgroundColor="white"
          maxWidth="360px"
          flex={1}
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop={6}
        >
          <Icon name="logo" height="150px" />
          <Box onSubmit={onSubmit} as="form" width="100%">
            <Text preset="title" marginTop={6}>
              Entrar
            </Text>
            <Input
              label="E-mail"
              boxStyle={{ marginTop: 4 }}
              placeholder="johndoe@example.com"
              errorMessage={errors.email?.message}
              type="email"
              {...register("email")}
            />
            <Input
              label="Senha"
              boxStyle={{ marginTop: 4 }}
              type="password"
              placeholder="Sua senha"
              errorMessage={errors.password?.message}
              {...register("password")}
            />
            {sessionsStore.errorMessage && (
              <Text marginTop={2} preset="errorMessage">
                {sessionsStore.errorMessage}
              </Text>
            )}
            <Button type="submit" marginTop={6}>
              Entrar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export { SignInScreen };
