export interface Person {
  id: number
  first_name: string
  last_name: string
  photo_url?: string
}

export const PersonHelper = {
  getFullName: (p: Person) => `${p.first_name} ${p.last_name}`,
}

export interface SortDataModel {
  id: string
  title: string
}

export const sortData: SortDataModel[] = [
  { title: "First Name", id: "first_name" },
  { title: "Last Name", id: "last_name" },
]
