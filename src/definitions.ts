export interface LocalAuthPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
