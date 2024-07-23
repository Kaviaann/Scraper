export interface InstagramDownload {
  thumbnail: URL;
  type: "image" | "video";
  media: URL;
  link: URL;
}

export interface InstagramSignature {
  expires: Number;
  signature: String;
}

export interface InstagramEntities {
  user: {
    id: Number;
    username: String;
  }[];
}

export interface InstagramStalk {
  user: {
    primary_profile_link_type: Number;
    show_fb_link_on_profile: Boolean;
    show_fb_page_link_on_profile: Boolean;
    can_hide_category: Boolean;
    account_type: Number;
    smb_support_partner: null;
    current_catalog_id: null;
    mini_shop_seller_onboarding_status: null;
    account_category: String;
    can_add_fb_group_link_on_profile: Boolean;
    can_use_affiliate_partnership_messaging_as_creator: Boolean;
    can_use_affiliate_partnership_messaging_as_brand: Boolean;
    existing_user_age_collection_enabled: Boolean;
    fbid_v2: String;
    feed_post_reshare_disabled: Boolean;
    full_name: String;
    has_guides: Boolean;
    has_ig_profile: Boolean;
    has_public_tab_threads: Boolean;
    highlight_reshare_disabled: Boolean;
    include_direct_blacklist_status: Boolean;
    is_direct_roll_call_enabled: Boolean;
    is_eligible_for_meta_verified_links_in_reels: Boolean;
    is_new_to_instagram: Boolean;
    is_new_to_instagram_30d: Boolean;
    is_parenting_account: Boolean;
    is_private: Boolean;
    is_secondary_account_creation: Boolean;
    pk: String;
    pk_id: String;
    profile_type: Number;
    show_account_transparency_details: Boolean;
    show_ig_app_switcher_badge: Boolean;
    show_post_insights_entry_point: Boolean;
    show_text_post_app_badge: Boolean;
    show_text_post_app_switcher_badge: Boolean;
    text_post_app_joiner_number_label: String;
    third_party_downloads_enabled: Number;
    username: String;
    is_profile_picture_expansion_enabled: Boolean;
    is_opal_enabled: Boolean;
    strong_id__: String;
    biography: String;
    biography_with_entities: {
      raw_text: String;
      entities: InstagramEntities[];
    };
    external_url: String;
    has_biography_translation: Boolean;
    category: null;
    is_category_tappable: Boolean;
    is_business: Boolean;
    professional_conversion_suggested_account_type: 2;
    displayed_action_button_partner: null;
    smb_delivery_partner: null;
    smb_support_delivery_partner: null;
    displayed_action_button_type: null;
    is_call_to_action_enabled: null;
    num_of_admined_pages: null;
    page_id: null;
    page_name: null;
    ads_page_id: null;
    ads_page_name: null;
    shopping_post_onboard_nux_type: null;
    ads_incentive_expiration_date: null;
    account_badges: [];
    additional_business_addresses: [];
    auto_expand_chaining: null;
    bio_links: [];
    birthday_today_visibility_for_viewer: "NOT_VISIBLE";
    can_use_branded_content_discovery_as_brand: Boolean;
    can_use_branded_content_discovery_as_creator: Boolean;
    can_use_paid_partnership_messaging_as_creator: Boolean;
    chaining_upsell_cards: [];
    creator_shopping_info: { linked_merchant_accounts: [] };
    fan_club_info: {
      fan_club_id: null;
      fan_club_name: null;
      is_fan_club_referral_eligible: null;
      fan_consideration_page_revamp_eligiblity: null;
      is_fan_club_gifting_eligible: null;
      subscriber_count: null;
      connected_member_count: null;
      autosave_to_exclusive_highlight: null;
      has_enough_subscribers_for_ssc: null;
    };
    follow_friction_type: 0;
    follower_count: 142;
    following_count: 518;
    has_anonymous_profile_picture: Boolean;
    has_chaining: Boolean;
    has_collab_collections: Boolean;
    has_exclusive_feed_content: Boolean;
    has_fan_club_subscriptions: Boolean;
    has_highlight_reels: Boolean;
    has_music_on_profile: Boolean;
    has_private_collections: Boolean;
    has_videos: Boolean;
    hd_profile_pic_url_info: {
      url: Number;
      width: Number;
      height: Number;
      url_signature: InstagramSignature;
    };
    hd_profile_pic_versions: [
      {
        width: Number;
        height: Number;
        url: String;
        url_signature: InstagramSignature;
      }
    ];
    highlights_tray_type: "DEFAULT";
    interop_messaging_user_fbid: Number;
    is_bestie: Boolean;
    is_eligible_for_meta_verified_enhanced_link_sheet: Boolean;
    is_eligible_for_meta_verified_enhanced_link_sheet_consumption: Boolean;
    is_eligible_for_meta_verified_multiple_addresses_creation: Boolean;
    is_eligible_for_meta_verified_multiple_addresses_consumption: Boolean;
    is_eligible_for_meta_verified_related_accounts: Boolean;
    meta_verified_related_accounts_count: 0;
    is_meta_verified_related_accounts_display_enabled: Boolean;
    is_eligible_for_meta_verified_label: Boolean;
    is_favorite: Boolean;
    is_in_canada: Boolean;
    is_interest_account: Boolean;
    is_memorialized: Boolean;
    is_potential_business: Boolean;
    is_regulated_news_in_viewer_location: Boolean;
    is_remix_setting_enabled_for_posts: Boolean;
    is_remix_setting_enabled_for_reels: Boolean;
    is_profile_broadcast_sharing_enabled: Boolean;
    is_regulated_c18: Boolean;
    is_stories_teaser_muted: Boolean;
    is_recon_ad_cta_on_profile_eligible_with_viewer: Boolean;
    is_supervision_features_enabled: Boolean;
    is_verified: Boolean;
    is_whatsapp_linked: Boolean;
    latest_besties_reel_media: 0;
    latest_reel_media: 0;
    live_subscription_status: "default";
    media_count: 4;
    mutual_followers_count: 0;
    nametag: null;
    open_external_url_with_in_app_browser: Boolean;
    pinned_channels_info: {
      pinned_channels_list: [];
      has_public_channels: Boolean;
    };
    profile_context: String;
    profile_context_facepile_users: [];
    profile_context_links_with_user_ids: [];
    profile_pic_id: String;
    profile_pic_url: String;
    pronouns: String[];
    relevant_news_regulation_locations: [];
    remove_message_entrypoint: Boolean;
    show_schools_badge: null;
    spam_follower_setting_enabled: Boolean;
    text_app_last_visited_time: null;
    text_post_app_badge_label: String;
    eligible_for_text_app_activation_badge: Boolean;
    total_ar_effects: Number;
    total_clips_count: Number;
    total_igtv_videos: Number;
    transparency_product_enabled: Boolean;
    recs_from_friends: {
      enable_recs_from_friends: Boolean;
      recs_from_friends_entry_point_type: "banner";
    };
    adjusted_banners_order: [];
    is_eligible_for_request_message: Boolean;
    trial_clips_enabled: Boolean;
    profile_pic_url_signature: InstagramSignature;
  };
  status: "ok" | "idk";
}

export declare function igDl(url: URL): Promise<InstagramDownload[]>;
export declare function igStalk(username: String): Promise<InstagramStalk>;
