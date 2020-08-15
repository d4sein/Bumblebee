export const errors = {
  no_bot_prefix: 'Oh, no. Seems like my prefix hasn\'t been set properly.',
  no_positional_params: 'Positional params haven\'t been set for this command. (This is an error btw)',
}

// Prefix `fn` to identify functions
export const responses = {
  no_command_given: 'You haven\'t given me any commands.',
  not_a_valid_command: 'This command doesn\'t exist.',
  fn_not_a_valid_argument: (usage: string): string => {
    return `You've given me invalid arguments.\nCheck usage: \`${usage}\``
  },
  fn_missing_positional_argument: (usage: string): string => {
    return `You're missing positional arguments.\nCheck usage: \`${usage}\``
  }
}
