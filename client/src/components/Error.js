import { Text } from '@chakra-ui/react';

export default function Error() {
  return (
    <>
      <Text
        margin="auto"
        color="red"
        fontSize="2rem"
        fontWeight="semibold"
        textAlign="center"
        transform="translateY(25vh)"
      >
        It seems like you entered an invalid URL!
      </Text>
    </>
  );
}
