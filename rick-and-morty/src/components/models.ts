export interface ILink {
  title: string
  caption: string
  icon: string
  link: string
}
interface IEpisode {
  id: string
  name: string
}
export interface ICharacter {
  id: string
  name: string
  image: string
  status: string
  gender: string
  species: string
  episode: IEpisode[]
}
