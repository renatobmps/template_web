export default function stringFormatToSlug(
  text: string,
  separator = '_',
): string {
  const lowerCaseText = text.toLowerCase();
  const normalizedText = lowerCaseText.normalize('NFD');
  const withoutAccents = normalizedText.replace(/[\u0300-\u036f]/g, '');
  const withoutSpecialCharactersText = withoutAccents.replace(/[^\w ]+/g, '');
  const underscoreBySpaceText = withoutSpecialCharactersText.replace(/_/g, ' ');
  const withoutDoubleSpaces = underscoreBySpaceText.replace(/ +/g, ' ');
  const trimText = withoutDoubleSpaces.trim();
  const withSeparatorText = trimText.replace(/ +/g, separator);
  const result = withSeparatorText;

  return result;
}
