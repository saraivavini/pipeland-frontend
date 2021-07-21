import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Box } from "../../components/box";
import { useStores } from "../../store";
import { Redirect, useHistory } from "react-router-dom";
import { Text } from "../../components/text";
import Header from "../../components/header/header";
import { formatDate } from "../../utils/date";

// import { Container } from './styles';

const MyClassesScreen: React.FC = observer(() => {
  const { sessionsStore, classesStore } = useStores();
  const history = useHistory();

  if (!sessionsStore.activeSession?.user) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    classesStore.fetchClasses();
  }, [classesStore]);

  const handleOpenClass = async (classId: string) => {
    history.push(`/my-classes/${classId}`);
  };

  return (
    <Box flex={1} height="100vh">
      <Header title="Minhas turmas" />
      <Box flex={1} p={2}>
        {classesStore.classes.map((c) => (
          <Box
            key={c.id}
            p={4}
            borderRadius={"4px"}
            boxShadow="0px 0px 4px 0 rgba(41,41,41,.25)"
            marginBottom={2}
            overflow="scroll"
            onClick={() => {
              handleOpenClass(c.id);
            }}
          >
            <Box mb={2}>
              <Text preset="title">{c.name}</Text>
            </Box>
            <Box mb={2}>
              <Text preset="subtitle">Professor {c.teacherName}</Text>
            </Box>
            <Box>
              <Text preset="subtitle">
                {formatDate(c.createDate, "dd 'de' MMM 'de' yyyy")}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export { MyClassesScreen };
