import React from "react";
import { Switch, Route } from "react-router-dom";
import { ClassDetailScreen } from "../screens/class-detail-screen/class-detail-screen";
import { MyClassesScreen } from "../screens/my-classes-screen";
import { SignInScreen } from "../screens/sign-in-screen";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignInScreen} />
      <Route path="/my-classes" exact component={MyClassesScreen} />
      <Route path="/my-classes/:id" component={ClassDetailScreen} />
    </Switch>
  );
};

export { Routes };
