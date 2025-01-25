import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const ResultItemSkeleton = () => {
  return (
    <Card>
      <Skeleton height="130px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default ResultItemSkeleton;
