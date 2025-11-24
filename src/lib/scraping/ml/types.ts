export interface MlProduct {
  id: string
  catalog_product_id: string
  status: string
  pdp_types: string[]
  domain_id: string
  permalink: string
  name: string
  family_name: string
  type: string
  buy_box_winner: null
  pickers: Picker[]
  pictures: Picture[]
  description_pictures: any[]
  main_features: MainFeature[]
  disclaimers: any[]
  attributes: MLPRODUCTAttribute[]
  short_description: ShortDescription
  parent_id: string
  user_product: null
  children_ids: any[]
  settings: Settings
  quality_type: string
  release_info: null
  presale_info: null
  enhanced_content: null
  tags: any[]
  date_created: Date
  authorized_stores: null
  last_updated: Date
  grouper_id: null
  experiments: Experiments
}

export interface MLPRODUCTAttribute {
  id: string
  name: string
  value_id: null | string
  value_name: string
  values: Value[]
  meta?: Meta
}

export interface Meta {
  value: boolean
}

export interface Value {
  id: string
  name: string
  meta?: Meta
}

export interface Experiments {}

export interface MainFeature {
  text: string
  type: string
  metadata: Experiments
}

export interface Picker {
  picker_id: string
  picker_name: string
  products: Product[]
  tags: any[]
  attributes: PickerAttribute[]
  value_name_delimiter: string
}

export interface PickerAttribute {
  attribute_id: string
  template: string
}

export interface Product {
  product_id: string
  picker_label: string
  picture_id: string
  thumbnail: string
  tags: string[]
  permalink: string
  product_name: string
  auto_completed: boolean
}

export interface Picture {
  id: string
  url: string
  suggested_for_picker: null
  max_width: number
  max_height: number
  source_metadata: null
  tags: string[]
}

export interface Settings {
  content: string
  listing_strategy: string
  with_enhanced_pictures: boolean
  base_site_product_id: null
  exclusive: boolean
}

export interface ShortDescription {
  type: string
  content: string
}

export interface MlAuth {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  user_id: number
  refresh_token: string
}
