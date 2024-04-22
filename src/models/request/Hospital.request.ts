export interface CreateHospitalsReqBody {
  categoryId: string
  name: string
  slug: string
  description: string
  session: string
  start_time: string | null
  end_time: string | null
  hotline: string
  address: string
  avatar: string | null
  banner: string | null
  images: string[] | null
  types: string[]
}
