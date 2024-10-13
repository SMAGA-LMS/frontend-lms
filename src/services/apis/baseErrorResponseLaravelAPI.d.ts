export interface BaseErrorResponseLaravelAPIDto {
  message: string;
  exception: string;
  file: string;
  line: number;
  trace: [
    {
      file: string;
      line: number;
      function: string;
      class: string;
      type: string;
    }
  ];
}
