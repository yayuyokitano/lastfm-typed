export interface Wiki {
	published?:string;
	summary:string;
	content:string;
}

interface ArtistAlbumInput {
	artist:string;
	album:string;
	mbid?:string;
}

interface MBIDAlbumInput {
	artist?:string;
	album?:string;
	mbid:string;
}

export type AlbumInput = ArtistAlbumInput | MBIDAlbumInput;

interface ArtistNameInput {
	artist:string;
	mbid?:string;
}

interface MBIDArtistInput {
	artist?:string;
	mbid:string;
}

export type ArtistInput = ArtistNameInput | MBIDArtistInput;

interface ArtistTrackInput {
	artist:string;
	track:string;
	mbid?:string;
}

interface MBIDTrackInput {
	artist?:string;
	track?:string;
	mbid:string;
}

export type TrackInput = ArtistTrackInput | MBIDTrackInput;

export interface ShortMetadata {
	page:number;
	perPage:number;
	totalPages:number;
	total:number;
}

export interface Image {
	url:string;
	size:string;
}

export interface ArtistNoMBID {
	name:string;
	url:string;
}

export interface ArtistBasic extends ArtistNoMBID {
	mbid:string;
}

export interface TrackBasic extends ArtistNoMBID {
	artist:ArtistBasic;
}

export interface ArtistOptionalMBID extends ArtistNoMBID {
	mbid?:string;
}

interface InfoNoMBID {
	name:string;
	url:string;
	image:Image[];
}

interface BasicInfo extends InfoNoMBID {
	mbid:string;
}

interface BasicOptionalMBID extends InfoNoMBID {
	mbid?:string;
}

export interface StringAlbum extends BasicInfo {
	artist:string;
	streamable:boolean;
}

export interface Album extends BasicInfo {
	artist:ArtistBasic;
}

interface AlbumOptionalMBID extends BasicOptionalMBID {
	artist:ArtistOptionalMBID;
}

export interface AlbumGlobal extends AlbumOptionalMBID {
	playcount:number;
}

export interface TagAlbum extends Album {
	rank:number;
}

export interface GlobalAlbum extends BasicOptionalMBID {
	artist:string;
	listeners:number;
	playcount:number;
}

export interface Artist extends ArtistBasic {
	streamable:boolean;
}

export interface TagArtist extends ArtistBasic {
	rank:number;
}

export interface ListenerArtist extends Artist {
	listeners:number;
}

export interface GlobalArtist extends ListenerArtist {
	playcount:number;
}

interface Track extends ArtistNoMBID {
	duration:number;
	streamable: {
		isStreamable:boolean;
		fulltrack:boolean;
	}
}

interface TrackMBID extends Track {
	mbid:string;
	artist:ArtistBasic;
}

interface TrackOptionalMBID extends Track {
	mbid?:string;
	artist:ArtistOptionalMBID;
}

export interface TrackOptionalMBIDImg extends TrackOptionalMBID {
	image:Image[];
}

export interface TagTrack extends TrackMBID {
	rank:number;
}

export interface ListenerTrack extends TrackMBID {
	listeners:number;
}

export interface GlobalTrack extends ListenerTrack {
	playcount:number;
}

export interface GlobalTrackOptionalMBID extends TrackOptionalMBID {
	playcount:number;
	listeners:number;
	userplaycount?:number;
}

interface Tag {
	name:string;
}

export interface TagWUrl extends Tag {
	url:string;
}

export interface TagUrlCount extends TagWUrl {
	count:number;
}

export interface TagBasic extends Tag {
	count:number;
	reach:number;
}

export interface TagGlobalNoWiki extends Tag {
	url:string;
	reach:number;
	taggings:string;
	streamable:boolean;
}