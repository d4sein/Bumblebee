// `fn` prefix for functions

const reportIssue = `Please report the issue at ${process.env.GITHUB}/issues.`

export const errors = {
  noBotPrefix: 'Oh, no. My prefix didn\'t get set properly, sorry :zany_face:.',
  // Use this whenever there's an error with a command, ex:
  // Keys not set correctly in the Map parameters,
  // Missing necessary information to run a command.
  badCommandConfig: `Seems like a bad developer worked on this one :zany_face:.\n${reportIssue}`,
  // Use this whenever there's an error that can't be explained by a
  // poorly written command or incorrect usage of a command by the user.
  unexpected: 'Something happend, it doesn\'t seem to be a problem with neither me nor you :thinking:.'
}

export const responses = {
  // Use this whenever there's an error caused by
  // incorrect usage of a command by the user.
  fnIncorrectUsage: (usage: string): string => {
    return `You're not doing it right, look: \`${usage}\``
  }
}
