var simplemaps_continentmap_mapdata={
  main_settings: {
    //General settings
		width: "700", //or 'responsive'
    background_color: "#FFFFFF",
    background_transparent: "yes",
    popups: "detect",
    
		//State defaults
		state_description: "State description",
    state_color: "#88A4BC",
    state_hover_color: "#3B729F",
    state_url: "https://simplemaps.com",
    border_size: 1.5,
    border_color: "#ffffff",
    all_states_inactive: "no",
    all_states_zoomable: "no",
    
		//Location defaults
		location_description: "Location description",
    location_color: "#FF0067",
    location_opacity: 0.8,
    location_hover_opacity: 1,
    location_url: "",
    location_size: 25,
    location_type: "square",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",
    
		//Label defaults
		label_color: "#ffffff",
    label_hover_color: "#ffffff",
    label_size: 22,
    label_font: "Arial",
    hide_labels: "no",
   
		//Zoom settings
		manual_zoom: "no",
    back_image: "no",
    arrow_box: "no",
    navigation_size: "40",
    navigation_color: "#f7f7f7",
    navigation_border_color: "#636363",
    initial_back: "no",
    initial_zoom: -1,
    initial_zoom_solo: "no",
    region_opacity: 1,
    region_hover_opacity: 0.6,
    zoom_out_incrementally: "yes",
    zoom_percentage: 0.99,
    zoom_time: 0.5,
    
		//Popup settings
		popup_color: "white",
    popup_opacity: 0.9,
    popup_shadow: 1,
    popup_corners: 5,
    popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
    popup_nocss: "no",
    
		//Advanced settings
		div: "map",
    auto_load: "yes",
    rotate: "0",
    url_new_tab: "yes",
    images_directory: "default",
    import_labels: "no",
    fade_time: 0.1,
    link_text: "View Website"
  },
  state_specific: {
    SA: {
      name: "South America",
      description: "default",
      color: "#CC33FF",
      hover_color: "#751d92",
      url: "../views/SArecipes.html"
    },
    NA: {
      name: "North America",
      description: "default",
      color: "#3366FF",
      hover_color: "#1c388c",
      url: "../views/NArecipes.html"
    },
    EU: {
      name: "Europe",
      description: "default",
      color: "#FF3366",
      hover_color: "#c0264d",
      url: "../views/EUrecipes.html"
    },
    AF: {
      name: "Africa",
      description: "default",
      color: "#33FF66",
      hover_color: "#1a8535",
      url: "../views/AFrecipes.html"
    },
    NS: {
      name: "North Asia",
      description: "default",
      color: "#33FFCC",
      hover_color: "#23b28e",
      url: "../views/NSrecipes.html"
    },
    SS: {
      name: "South Asia",
      description: "default",
      color: "#FF6633",
      hover_color: "#ac4422",
      url: "../views/SSrecipes.html"
    },
    ME: {
      name: "Middle East",
      description: "default",
      color: "#FFCC33",
      hover_color: "#bb9525",
      url: "../views/MErecipes.html"
    },
    OC: {
      name: "Oceania",
      description: "default",
      color: "#FF33CC",
      hover_color: "#b1238d",
      url: "../views/OCrecipes.html"
    }
  },
  labels: {}
};