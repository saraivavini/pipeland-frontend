import React from "react";

import { Avatar } from "../avatar";
import { ProgressBar } from "../progress-bar";
import { Text } from "../text";

import {
  CardContainer,
  UserInfoContainer,
  GameElementsList,
} from "./user-card.styles";
import { Icon } from "../icon/icon";
import { useStores } from "../../store";
import { observer } from "mobx-react";

import { Box } from "../box";

export const UserCard = observer(() => {
  const { classesStore, sessionsStore } = useStores();

  if (!classesStore.studentInfo) return null;

  return (
    <CardContainer>
      <Box alignItems="center" justifyContent="center">
        <Avatar
          size={80}
          name={sessionsStore.activeSession?.user?.name}
          uri={sessionsStore.activeSession?.user?.photo_url}
        />
      </Box>
      <UserInfoContainer>
        <Box flexDirection="row" alignItems="center" width="100%">
          <Text preset="title" flexShrink={1} numberOfLines={1}>
            {sessionsStore.activeSession?.user?.nickname ||
              sessionsStore.activeSession?.user?.name}
          </Text>
          <Icon
            name={classesStore.studentInfo.current_avatar}
            marginLeft={2}
            size={16}
          />
        </Box>
        <ProgressBar
          marginTop={4}
          currentPoints={classesStore.studentInfo.current_coinst_qty}
          totalPoints={classesStore.selectedClass?.coinsMax || 0}
        />
        <GameElementsList>
          <Box flexDirection="row" alignItems="center">
            <Icon marginRight={2} name="attendanceAnchor" />
            <Text>{classesStore.studentInfo.attendances_count}</Text>
          </Box>
          <Box flexDirection="row" alignItems="center" marginLeft={4}>
            <Icon marginRight={2} name="mushroomUp" />
            <Text>{classesStore.studentInfo.current_mushroom_ups_qty}</Text>
          </Box>
        </GameElementsList>
      </UserInfoContainer>
    </CardContainer>
  );
});
