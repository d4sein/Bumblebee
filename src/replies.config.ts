// `fn` prefix for functions

const reportIssue = 'Please report the issue at https://github.com/d4sein/Bumblebee/issues.'

export const errors = {
  noBotPrefix: 'Oh, no. My prefix didn\'t get set properly, sorry :zany_face:.',
  badCommandConfig: `Seems like a bad developer worked on this one :zany_face:.\n${reportIssue}`,
  unexpected: 'Something happend, it doesn\'t seem to be a problem with neither me nor you :thinking:.'
}

export const responses = {
  fnIncorrectUsage: (usage: string): string => {
    return `You're not doing it right, look: \`${usage}\``
  }
}
