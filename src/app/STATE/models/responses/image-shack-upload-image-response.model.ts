/**
 * Created by TrUnK on 08.02.2017.
 */

interface ImageShackError {
  error_code: number;
  error_message: string;
}

interface ImageShackResponse {
  success: boolean;
  process_time: number;
  error: ImageShackError;
}

interface ImageShackImageModel {
  id: string;
  server: number;
  bucket: number;
  filename: string;
  original_filename: string;
  direct_link: string;
  title: string;
  album_id: string;
  album_title: string;
  creation_date: number;
  'public': boolean;
  hidden: boolean;
  filesize: number;
  width: number;
  height: number;
  owner: {
    username: string;
    avatar: {
      id: string;
      server: number;
      filename: string;
    };
  };
}

export interface ImageShackUploadImageResponse extends ImageShackResponse {
  result: {
    max_filesize: number;
    space_limit: number;
    space_used: number;
    space_left: number;
    passed: number;
    failed: number;
    images: ImageShackImageModel[];
  };
}
