import { Media } from '../../../shared/domain/media';
import { Account, AccountReviewInformation } from '../account';

export const accountBuilder = ({
  id = 'acount-id',
  name = 'account-name',
  avatar = {
    uri: 'account-avatar', height: 200, width: 200, extension: 'jpg', type: 'image',
  } as Media,
  username = 'account-username',
  bio = 'account-bio',
  review = {
    total: 10,
    average: 4,
  },
  totalFollowers = 168000,
  totalFollowing = 721,
}: {
  id?: string;
  name?: string;
  avatar?: Media
  username?: string
  bio?: string
  review?: AccountReviewInformation
  totalFollowers?: number;
  totalFollowing?: number;
} = {}) => {
  const props = {
    id,
    name,
    avatar,
    username,
    bio,
    review,
    totalFollowers,
    totalFollowing,
  };

  return {
    withId(_id: string) {
      return accountBuilder({
        ...props,
        id: _id,
      });
    },
    withName(_name: string) {
      return accountBuilder({
        ...props,
        name: _name,
      });
    },
    withAvatar(_avatar: Media) {
      return accountBuilder({
        ...props,
        avatar: _avatar,
      });
    },
    withUsername(_username: string) {
      return accountBuilder({
        ...props,
        username: _username,
      });
    },
    withBio(_bio: string) {
      return accountBuilder({
        ...props,
        bio: _bio,
      });
    },
    withReview(_review: AccountReviewInformation) {
      return accountBuilder({
        ...props,
        review: _review,
      });
    },
    withTotalFollowers(_totalFollowers: number) {
      return accountBuilder({
        ...props,
        totalFollowers: _totalFollowers,
      });
    },
    withTotalFollowing(_totalFollowing: number) {
      return accountBuilder({
        ...props,
        totalFollowing: _totalFollowing,
      });
    },
    build(): Account {
      return {
        id: props.id,
        name: props.name,
        avatar: props.avatar,
        username: props.username,
        bio: props.bio,
        review: props.review,
        totalFollowers: props.totalFollowers,
        totalFollowing: props.totalFollowing,
      };
    },
  };
};
