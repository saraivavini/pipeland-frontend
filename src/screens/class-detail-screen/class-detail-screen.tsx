import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "../../components/box";
import Header from "../../components/header/header";
import { useStores } from "../../store";

// import { Container } from './styles';

const ClassDetailScreen: React.FC = () => {
  const { classesStore } = useStores();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    classesStore.fetchClassDetails(params.id);
  }, [classesStore, params]);

  return (
    <Box>
      <Header title={classesStore.selectedClass?.name} />
      <Box>
        <UserCard />
      </Box>
    </Box>
  );
};

export { ClassDetailScreen };
