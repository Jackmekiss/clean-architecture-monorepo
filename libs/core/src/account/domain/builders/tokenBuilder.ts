import { Token } from '../token';

export const tokenBuilder = ({
  accessToken = 'access-token',
}: {
  accessToken?: string;
} = {}) => {
  const props = {
    accessToken,
  };

  return {
    withAccessToken(_accessToken: string) {
      return tokenBuilder({
        ...props,
        accessToken: _accessToken,
      });
    },
    build(): Token {
      return {
        accessToken: props.accessToken,
      };
    },
  };
};
