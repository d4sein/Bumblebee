function show_usage(usage: string): string {
  return `\nCheck usage: \`${usage}\``
}

export const errors = {
  no_bot_prefix: 'Oh, no. Seems like my prefix hasn\'t been set properly.',
  no_positional_params: 'Positional params haven\'t been set for this command. (This is an error btw)',
}

// Prefix `fn` to identify functions
export const responses = {
  no_command_given: 'You haven\'t given me any commands.',
  fn_not_a_valid_command: (commandName: string): string => {
    return `The command \`${commandName}\` doesn't exist.`
  },
  fn_not_a_valid_flag: (usage: string): string => {
    return `You've given me invalid flags.${show_usage(usage)}`
  },
  fn_missing_positional_flag: (usage: string): string => {
    return `You're missing positional flags.${show_usage(usage)}`
  },
  fn_value_is_not_keyword: (value: string, usage: string): string => {
    return `Value \`${value}\` can't be empty.${show_usage(usage)}`
  }
}
