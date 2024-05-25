export class UnathorizedResquestError extends Error {
  constructor(message?: string) {
    super(message ?? 'Unathorized.')
  }
}
