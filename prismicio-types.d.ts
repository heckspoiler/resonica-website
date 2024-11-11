// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Item in *date → Event Acts*
 */
export interface DateDocumentDataDateActsItem {
  /**
   * Act field in *date → Event Acts*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Name of Act & Link to SC in Linkfield
   * - **API ID Path**: date.date_acts[].date_act
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  date_act: prismic.LinkField;
}

type DateDocumentDataSlicesSlice = never;

/**
 * Content for date documents
 */
interface DateDocumentData {
  /**
   * Date/Event Type field in *date*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Club, Festival, Release
   * - **API ID Path**: date.date_type
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  date_type: prismic.RichTextField;

  /**
   * Event Hero Image field in *date*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: date.hero_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  hero_image: prismic.ImageField<never>;

  /**
   * Event Acts field in *date*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: date.date_acts[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  date_acts: prismic.GroupField<Simplify<DateDocumentDataDateActsItem>>;

  /**
   * Ticket Link field in *date*
   *
   * - **Field Type**: Link
   * - **Placeholder**: TICKET or GET TICKETS or whatever you want
   * - **API ID Path**: date.ticket_link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  ticket_link: prismic.LinkField;

  /**
   * Event Title field in *date*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Resonica at Zukunft
   * - **API ID Path**: date.date_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  date_title: prismic.RichTextField;

  /**
   * Event Time field in *date*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: 23:59 - 06.00
   * - **API ID Path**: date.date_time
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  date_time: prismic.RichTextField;

  /**
   * Event Start Date field in *date*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: 12.02.2025
   * - **API ID Path**: date.event_start_date
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  event_start_date: prismic.RichTextField;

  /**
   * Event Description field in *date*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Max. 750 characters
   * - **API ID Path**: date.event_description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  event_description: prismic.KeyTextField;

  /**
   * Event End Date field in *date*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Only if Festival or two dates are needed
   * - **API ID Path**: date.event_end_date
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  event_end_date: prismic.RichTextField;

  /**
   * Date Index field in *date*
   *
   * - **Field Type**: Text
   * - **Placeholder**: IMPORTANT FOR THE SORTING!
   * - **API ID Path**: date.date_index
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  date_index: prismic.KeyTextField;

  /**
   * Slice Zone field in *date*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: date.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<DateDocumentDataSlicesSlice> /**
   * Meta Title field in *date*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: date.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *date*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: date.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *date*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: date.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * date document from Prismic
 *
 * - **API ID**: `date`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type DateDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<DateDocumentData>, "date", Lang>;

type DatesDocumentDataSlicesSlice = never;

/**
 * Content for dates documents
 */
interface DatesDocumentData {
  /**
   * Slice Zone field in *dates*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: dates.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<DatesDocumentDataSlicesSlice> /**
   * Meta Title field in *dates*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: dates.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *dates*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: dates.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *dates*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: dates.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * dates document from Prismic
 *
 * - **API ID**: `dates`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type DatesDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<DatesDocumentData>, "dates", Lang>;

type PageDocumentDataSlicesSlice = RichTextSlice;

/**
 * Content for Page documents
 */
interface PageDocumentData {
  /**
   * Title field in *Page*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: page.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Slice Zone field in *Page*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: page.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<PageDocumentDataSlicesSlice> /**
   * Meta Title field in *Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: page.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: page.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Page*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

/**
 * Item in *Release → Buylink Container*
 */
export interface ReleaseDocumentDataBuylinkContainerItem {
  /**
   * Buylink Label field in *Release → Buylink Container*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Get on Bandcamp
   * - **API ID Path**: release.buylink_container[].buylink_label
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  buylink_label: prismic.LinkField;
}

/**
 * Item in *Release → Release Titlelist*
 */
export interface ReleaseDocumentDataReleaseTitlelistItem {
  /**
   * Artist Name field in *Release → Release Titlelist*
   *
   * - **Field Type**: Text
   * - **Placeholder**: 2M
   * - **API ID Path**: release.release_titlelist[].artist_name
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  artist_name: prismic.KeyTextField;

  /**
   * Track Name field in *Release → Release Titlelist*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: release.release_titlelist[].track_name
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  track_name: prismic.KeyTextField;

  /**
   * Track Time field in *Release → Release Titlelist*
   *
   * - **Field Type**: Text
   * - **Placeholder**: 04:32
   * - **API ID Path**: release.release_titlelist[].track_time
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  track_time: prismic.KeyTextField;
}

type ReleaseDocumentDataSlicesSlice = never;

/**
 * Content for Release documents
 */
interface ReleaseDocumentData {
  /**
   * Release Image field in *Release*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: release.release_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  release_image: prismic.ImageField<never>;

  /**
   * Buylink Container field in *Release*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: release.buylink_container[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  buylink_container: prismic.GroupField<
    Simplify<ReleaseDocumentDataBuylinkContainerItem>
  >;

  /**
   * Release Date field in *Release*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: 14.04.2025 ("Release Date" is hardcoded)
   * - **API ID Path**: release.release_date
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  release_date: prismic.RichTextField;

  /**
   * Release Title field in *Release*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Resonica001
   * - **API ID Path**: release.release_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  release_title: prismic.RichTextField;

  /**
   * Release Description field in *Release*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: release.release_description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  release_description: prismic.RichTextField;

  /**
   * Release Titlelist field in *Release*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: release.release_titlelist[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  release_titlelist: prismic.GroupField<
    Simplify<ReleaseDocumentDataReleaseTitlelistItem>
  >;

  /**
   * Release number field in *Release*
   *
   * - **Field Type**: Text
   * - **Placeholder**: 001
   * - **API ID Path**: release.release_number
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  release_number: prismic.KeyTextField;

  /**
   * Release Index field in *Release*
   *
   * - **Field Type**: Text
   * - **Placeholder**: IMPORTANT FOR THE SORTING!
   * - **API ID Path**: release.release_index
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  release_index: prismic.KeyTextField;

  /**
   * Slice Zone field in *Release*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: release.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<ReleaseDocumentDataSlicesSlice> /**
   * Meta Title field in *Release*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: release.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Release*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: release.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Release*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: release.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Release document from Prismic
 *
 * - **API ID**: `release`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ReleaseDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<ReleaseDocumentData>,
    "release",
    Lang
  >;

type ReleasesDocumentDataSlicesSlice = never;

/**
 * Content for Releases documents
 */
interface ReleasesDocumentData {
  /**
   * Slice Zone field in *Releases*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: releases.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<ReleasesDocumentDataSlicesSlice> /**
   * Meta Title field in *Releases*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: releases.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Releases*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: releases.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Releases*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: releases.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Releases document from Prismic
 *
 * - **API ID**: `releases`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ReleasesDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<ReleasesDocumentData>,
    "releases",
    Lang
  >;

/**
 * Item in *Settings → Navigation*
 */
export interface SettingsDocumentDataNavigationItem {
  /**
   * Link field in *Settings → Navigation*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;

  /**
   * Link Label field in *Settings → Navigation*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation[].label
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  label: prismic.KeyTextField;
}

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
  /**
   * Site Title field in *Settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.site_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  site_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.meta_description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * OG Image field in *Settings*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.og_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  og_image: prismic.ImageField<never>;

  /**
   * Navigation field in *Settings*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  navigation: prismic.GroupField<Simplify<SettingsDocumentDataNavigationItem>>;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<SettingsDocumentData>,
    "settings",
    Lang
  >;

/**
 * Item in *Social Bar → Social Bar*
 */
export interface SocialBarDocumentDataSocialBarItem {
  /**
   * Social Icon field in *Social Bar → Social Bar*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: social_bar.social_bar[].social_icon
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  social_icon: prismic.ImageField<never>;

  /**
   * Social Link field in *Social Bar → Social Bar*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: social_bar.social_bar[].social_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  social_link: prismic.LinkField;
}

/**
 * Content for Social Bar documents
 */
interface SocialBarDocumentData {
  /**
   * Social Bar field in *Social Bar*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: social_bar.social_bar[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  social_bar: prismic.GroupField<Simplify<SocialBarDocumentDataSocialBarItem>>;
}

/**
 * Social Bar document from Prismic
 *
 * - **API ID**: `social_bar`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SocialBarDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<SocialBarDocumentData>,
    "social_bar",
    Lang
  >;

export type AllDocumentTypes =
  | DateDocument
  | DatesDocument
  | PageDocument
  | ReleaseDocument
  | ReleasesDocument
  | SettingsDocument
  | SocialBarDocument;

/**
 * Primary content in *RichText → Default → Primary*
 */
export interface RichTextSliceDefaultPrimary {
  /**
   * Content field in *RichText → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Lorem ipsum...
   * - **API ID Path**: rich_text.default.primary.content
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  content: prismic.RichTextField;
}

/**
 * Default variation for RichText Slice
 *
 * - **API ID**: `default`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RichTextSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<RichTextSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *RichText*
 */
type RichTextSliceVariation = RichTextSliceDefault;

/**
 * RichText Shared Slice
 *
 * - **API ID**: `rich_text`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RichTextSlice = prismic.SharedSlice<
  "rich_text",
  RichTextSliceVariation
>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      DateDocument,
      DateDocumentData,
      DateDocumentDataDateActsItem,
      DateDocumentDataSlicesSlice,
      DatesDocument,
      DatesDocumentData,
      DatesDocumentDataSlicesSlice,
      PageDocument,
      PageDocumentData,
      PageDocumentDataSlicesSlice,
      ReleaseDocument,
      ReleaseDocumentData,
      ReleaseDocumentDataBuylinkContainerItem,
      ReleaseDocumentDataReleaseTitlelistItem,
      ReleaseDocumentDataSlicesSlice,
      ReleasesDocument,
      ReleasesDocumentData,
      ReleasesDocumentDataSlicesSlice,
      SettingsDocument,
      SettingsDocumentData,
      SettingsDocumentDataNavigationItem,
      SocialBarDocument,
      SocialBarDocumentData,
      SocialBarDocumentDataSocialBarItem,
      AllDocumentTypes,
      RichTextSlice,
      RichTextSliceDefaultPrimary,
      RichTextSliceVariation,
      RichTextSliceDefault,
    };
  }
}
