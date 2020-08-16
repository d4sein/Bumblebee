function show_usage(usage: string): string {
  return `\nCheck usage: \`${usage}\``
}

export const errors = {
  noBotPrefix: 'Oh, no. Seems like my prefix hasn\'t been set properly.',
  noPositionalParams: 'Positional params haven\'t been set for this command. (This is an error btw)',
}

// Prefix `fn` to identify functions
export const responses = {
  fnNotValidFlag: (usage: string): string => {
    return `You've given me invalid flags.${show_usage(usage)}`
  },
  fnMissingPositionalFlag: (usage: string): string => {
    return `You're missing positional flags.${show_usage(usage)}`
  },
  fnValueIsNotKeyword: (value: string, usage: string): string => {
    return `Value \`${value}\` can't be empty.${show_usage(usage)}`
  }
}
