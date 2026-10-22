import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Item in *2M → 2m Socials*
 */
export interface _2mDocumentDataZweimSocialsItem {
	/**
	 * Social Icon field in *2M → 2m Socials*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: 2m.zweim_socials[].social_icon
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	social_icon: prismic.ImageField<never>;
	
	/**
	 * Social Link field in *2M → 2m Socials*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: 2m.zweim_socials[].social_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	social_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *2M → 2M Links*
 */
export interface _2mDocumentDataZweimLinksItem {
	/**
	 * Link field in *2M → 2M Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: 2m.zweim_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

type _2mDocumentDataSlicesSlice = never

/**
 * Content for 2M documents
 */
interface _2mDocumentData {
	/**
	 * Hero Image field in *2M*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: 2m.hero_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	hero_image: prismic.ImageField<never>;
	
	/**
	 * Page Title field in *2M*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: 2M
	 * - **API ID Path**: 2m.page_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	page_title: prismic.RichTextField;
	
	/**
	 * 2m Description field in *2M*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: 2m.zweim_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	zweim_description: prismic.RichTextField;
	
	/**
	 * 2m Socials field in *2M*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: 2m.zweim_socials[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	zweim_socials: prismic.GroupField<Simplify<_2mDocumentDataZweimSocialsItem>>;
	
	/**
	 * 2M Links field in *2M*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: 2m.zweim_links[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	zweim_links: prismic.GroupField<Simplify<_2mDocumentDataZweimLinksItem>>;
	
	/**
	 * 2M Description field in *2M*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: 2m.zweim_descriptionagain
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	zweim_descriptionagain: prismic.KeyTextField;
	
	/**
	 * Slice Zone field in *2M*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: 2m.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<_2mDocumentDataSlicesSlice>;/**
	 * Meta Title field in *2M*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: 2m.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *2M*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: 2m.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *2M*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: 2m.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * 2M document from Prismic
 *
 * - **API ID**: `2m`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type _2mDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<_2mDocumentData>, "2m", Lang>;

/**
 * Item in *date → Event Dates*
 */
export interface DateDocumentDataEventDatesItem {
	/**
	 * Date field in *date → Event Dates*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: date.event_dates[].date
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	date: prismic.DateField;
	
	/**
	 * Time field in *date → Event Dates*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 23:00 - 06:00
	 * - **API ID Path**: date.event_dates[].time
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	time: prismic.KeyTextField;
}

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
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	date_act: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Content for date documents
 */
interface DateDocumentData {
	/**
	 * Event Hero Image field in *date*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: date.hero_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	hero_image: prismic.ImageField<never>;
	
	/**
	 * Date/Event Type field in *date*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Club, Festival, Release
	 * - **API ID Path**: date.date_type
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	date_type: prismic.RichTextField;
	
	/**
	 * Event Title field in *date*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Resonica at Zukunft
	 * - **API ID Path**: date.date_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	date_title: prismic.RichTextField;
	
	/**
	 * Event Dates field in *date*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: date.event_dates[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	event_dates: prismic.GroupField<Simplify<DateDocumentDataEventDatesItem>>;
	
	/**
	 * Event Description (Rich Text) field in *date*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Paragraphs, bold, italic, lists, links, H4/H5 – replaces the plain-text description
	 * - **API ID Path**: date.event_description_rich
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	event_description_rich: prismic.RichTextField;
	
	/**
	 * Ticket Link field in *date*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: TICKET or GET TICKETS or whatever you want
	 * - **API ID Path**: date.ticket_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	ticket_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Event Acts field in *date*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: date.date_acts[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	date_acts: prismic.GroupField<Simplify<DateDocumentDataDateActsItem>>;/**
	 * Meta Title field in *date*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: date.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *date*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: date.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *date*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: date.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * date document from Prismic
 *
 * - **API ID**: `date`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type DateDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<DateDocumentData>, "date", Lang>;

type DatesDocumentDataSlicesSlice = never

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
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<DatesDocumentDataSlicesSlice>;/**
	 * Meta Title field in *dates*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: dates.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *dates*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: dates.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *dates*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: dates.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * dates document from Prismic
 *
 * - **API ID**: `dates`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type DatesDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<DatesDocumentData>, "dates", Lang>;

/**
 * Content for Marquee documents
 */
interface MarqueeDocumentData {
	/**
	 * Marquee Text field in *Marquee*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: marquee.marquee_text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	marquee_text: prismic.KeyTextField;
	
	/**
	 * Logo field in *Marquee*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: marquee.logo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * Show Marquee field in *Marquee*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: marquee.show_marquee
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	show_marquee: prismic.BooleanField;
	
	/**
	 * Second marquee Text field in *Marquee*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: marquee.second_marquee_text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	second_marquee_text: prismic.KeyTextField;
	
	/**
	 * Marquee Link field in *Marquee*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: Event/Release Link
	 * - **API ID Path**: marquee.marquee_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	marquee_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Marquee document from Prismic
 *
 * - **API ID**: `marquee`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type MarqueeDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<MarqueeDocumentData>, "marquee", Lang>;

type PageDocumentDataSlicesSlice = RichTextSlice

/**
 * Content for Page documents
 */
interface PageDocumentData {
	/**
	 * Title field in *Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Slice Zone field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<PageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

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
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	artist_name: prismic.KeyTextField;
	
	/**
	 * Track Name field in *Release → Release Titlelist*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: release.release_titlelist[].track_name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	track_name: prismic.KeyTextField;
	
	/**
	 * Track Time field in *Release → Release Titlelist*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 04:32
	 * - **API ID Path**: release.release_titlelist[].track_time
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	track_time: prismic.KeyTextField;
}

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
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	buylink_label: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

type ReleaseDocumentDataSlicesSlice = never

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
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	release_image: prismic.ImageField<never>;
	
	/**
	 * Release Index field in *Release*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: IMPORTANT FOR THE SORTING!
	 * - **API ID Path**: release.release_index
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	release_index: prismic.KeyTextField;
	
	/**
	 * Release number field in *Release*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 001
	 * - **API ID Path**: release.release_number
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	release_number: prismic.KeyTextField;
	
	/**
	 * Release Title field in *Release*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Resonica001
	 * - **API ID Path**: release.release_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	release_title: prismic.RichTextField;
	
	/**
	 * Release Date field in *Release*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: 14.04.2025 ("Release Date" is hardcoded)
	 * - **API ID Path**: release.release_date
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	release_date: prismic.RichTextField;
	
	/**
	 * Release Description field in *Release*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: release.release_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	release_description: prismic.RichTextField;
	
	/**
	 * Release Titlelist field in *Release*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: release.release_titlelist[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	release_titlelist: prismic.GroupField<Simplify<ReleaseDocumentDataReleaseTitlelistItem>>;
	
	/**
	 * Buylink Container field in *Release*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: release.buylink_container[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	buylink_container: prismic.GroupField<Simplify<ReleaseDocumentDataBuylinkContainerItem>>;
	
	/**
	 * Slice Zone field in *Release*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: release.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<ReleaseDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Release*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: release.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Release*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: release.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Release*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: release.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Release document from Prismic
 *
 * - **API ID**: `release`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ReleaseDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<ReleaseDocumentData>, "release", Lang>;

type ReleasesDocumentDataSlicesSlice = never

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
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<ReleasesDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Releases*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: releases.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Releases*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: releases.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Releases*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: releases.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Releases document from Prismic
 *
 * - **API ID**: `releases`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ReleasesDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<ReleasesDocumentData>, "releases", Lang>;

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
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Link Label field in *Settings → Navigation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.navigation[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
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
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	site_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.meta_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * OG Image field in *Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.og_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	og_image: prismic.ImageField<never>;
	
	/**
	 * Navigation field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.navigation[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	navigation: prismic.GroupField<Simplify<SettingsDocumentDataNavigationItem>>;
	
	/**
	 * Logo field in *Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.logo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SettingsDocumentData>, "settings", Lang>;

/**
 * Content for Shop Element documents
 */
interface ShopElementDocumentData {
	/**
	 * Product Image field in *Shop Element*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: shop_element.product_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	product_image: prismic.ImageField<never>;
	
	/**
	 * Product Link field in *Shop Element*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: shop_element.product_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	product_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Product Description field in *Shop Element*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: shop_element.product_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	product_description: prismic.KeyTextField;
}

/**
 * Shop Element document from Prismic
 *
 * - **API ID**: `shop_element`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ShopElementDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<ShopElementDocumentData>, "shop_element", Lang>;

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
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	social_icon: prismic.ImageField<never>;
	
	/**
	 * Social Link field in *Social Bar → Social Bar*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: social_bar.social_bar[].social_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	social_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
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
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	social_bar: prismic.GroupField<Simplify<SocialBarDocumentDataSocialBarItem>>;
}

/**
 * Social Bar document from Prismic
 *
 * - **API ID**: `social_bar`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SocialBarDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SocialBarDocumentData>, "social_bar", Lang>;

type StudioDocumentDataSlicesSlice = never

/**
 * Item in *Studio → Studio Socials*
 */
export interface StudioDocumentDataStudioSocialsItem {
	/**
	 * Social Icon field in *Studio → Studio Socials*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: studio.studio_socials[].social_icon
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	social_icon: prismic.ImageField<never>;
	
	/**
	 * Social Link field in *Studio → Studio Socials*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: studio.studio_socials[].social_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	social_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *Studio → Studio Links*
 */
export interface StudioDocumentDataStudioLinksItem {
	/**
	 * Link field in *Studio → Studio Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: studio.studio_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Content for Studio documents
 */
interface StudioDocumentData {
	/**
	 * Slice Zone field in *Studio*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: studio.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<StudioDocumentDataSlicesSlice>;
	
	/**
	 * Hero Image field in *Studio*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: studio.hero_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	hero_image: prismic.ImageField<never>;
	
	/**
	 * Page Title field in *Studio*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Studio
	 * - **API ID Path**: studio.page_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	page_title: prismic.RichTextField;
	
	/**
	 * Studio Description field in *Studio*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: studio.studio_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	studio_description: prismic.RichTextField;
	
	/**
	 * Studio Socials field in *Studio*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: studio.studio_socials[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	studio_socials: prismic.GroupField<Simplify<StudioDocumentDataStudioSocialsItem>>;
	
	/**
	 * Studio Links field in *Studio*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: studio.studio_links[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	studio_links: prismic.GroupField<Simplify<StudioDocumentDataStudioLinksItem>>;/**
	 * Meta Title field in *Studio*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: studio.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Studio*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: studio.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Studio*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: studio.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Studio document from Prismic
 *
 * - **API ID**: `studio`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type StudioDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<StudioDocumentData>, "studio", Lang>;

export type AllDocumentTypes = _2mDocument | DateDocument | DatesDocument | MarqueeDocument | PageDocument | ReleaseDocument | ReleasesDocument | SettingsDocument | ShopElementDocument | SocialBarDocument | StudioDocument;

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
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
}

/**
 * Default variation for RichText Slice
 *
 * - **API ID**: `default`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type RichTextSliceDefault = prismic.SharedSliceVariation<"default", Simplify<RichTextSliceDefaultPrimary>, never>;

/**
 * Slice variation for *RichText*
 */
type RichTextSliceVariation = RichTextSliceDefault

/**
 * RichText Shared Slice
 *
 * - **API ID**: `rich_text`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type RichTextSlice = prismic.SharedSlice<"rich_text", RichTextSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			_2mDocument,
			_2mDocumentData,
			_2mDocumentDataZweimSocialsItem,
			_2mDocumentDataZweimLinksItem,
			_2mDocumentDataSlicesSlice,
			DateDocument,
			DateDocumentData,
			DateDocumentDataEventDatesItem,
			DateDocumentDataDateActsItem,
			DatesDocument,
			DatesDocumentData,
			DatesDocumentDataSlicesSlice,
			MarqueeDocument,
			MarqueeDocumentData,
			PageDocument,
			PageDocumentData,
			PageDocumentDataSlicesSlice,
			ReleaseDocument,
			ReleaseDocumentData,
			ReleaseDocumentDataReleaseTitlelistItem,
			ReleaseDocumentDataBuylinkContainerItem,
			ReleaseDocumentDataSlicesSlice,
			ReleasesDocument,
			ReleasesDocumentData,
			ReleasesDocumentDataSlicesSlice,
			SettingsDocument,
			SettingsDocumentData,
			SettingsDocumentDataNavigationItem,
			ShopElementDocument,
			ShopElementDocumentData,
			SocialBarDocument,
			SocialBarDocumentData,
			SocialBarDocumentDataSocialBarItem,
			StudioDocument,
			StudioDocumentData,
			StudioDocumentDataSlicesSlice,
			StudioDocumentDataStudioSocialsItem,
			StudioDocumentDataStudioLinksItem,
			AllDocumentTypes,
			RichTextSlice,
			RichTextSliceDefaultPrimary,
			RichTextSliceVariation,
			RichTextSliceDefault
		}
	}
}