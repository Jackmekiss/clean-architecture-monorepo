import { Media } from '../media';

export const mediaBuilder = ({
  uri = 'media-uri',
  height = 100,
  width = 100,
  extension = 'png',
  type = 'image',
}: {
  uri?: string;
  height?: number;
  width?: number;
  extension?: string;
  type?: 'image' | 'video'
} = {}) => {
  const props = {
    uri,
    height,
    width,
    extension,
    type,
  };

  return {
    withUri(_uri: string) {
      return mediaBuilder({
        ...props,
        uri: _uri,
      });
    },
    withHeight(_height: number) {
      return mediaBuilder({
        ...props,
        height: _height,
      });
    },
    withWidth(_width: number) {
      return mediaBuilder({
        ...props,
        width: _width,
      });
    },
    withExtension(_extension: string) {
      return mediaBuilder({
        ...props,
        extension: _extension,
      });
    },
    withType(_type: 'image' | 'video') {
      return mediaBuilder({
        ...props,
        type: _type,
      });
    },
    build(): Media {
      return {
        uri: props.uri,
        height: props.height,
        width: props.width,
        extension: props.extension,
        type: props.type,
      };
    },
  };
};
