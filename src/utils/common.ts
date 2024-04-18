export const numberEnumToArray = (numberEnum: {[key: string]: string | number}) => {
  console.log(Object.values(numberEnum))
  return Object.values(numberEnum).filter((value) => typeof value === 'number') as number[]
}
