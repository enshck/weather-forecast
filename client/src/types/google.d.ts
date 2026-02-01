/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace google {
  namespace script {
    function run<T = any>(): any;

    namespace run {
      function withSuccessHandler<T>(callback: (result: T) => void): any;
      function withFailureHandler(callback: (error: Error) => void): any;
    }
  }
}
