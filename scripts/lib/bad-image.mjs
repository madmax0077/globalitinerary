/**
 * Shared non-scenic image detector for travel heroes/galleries.
 * Keep this strict — stamps, COAs, density maps, flags must never ship.
 */
export const BAD_IMAGE =
  /flag[_ ]?of|\.svg(?:\?|\/|$)|locator|orthographic|coat[_ ]?of[_ ]?arms|coats[_ ]?of[_ ]?arms|\bemblem\b|insignia|location_map|seal_of|BlankMap|political_map|world_map|Globe_icon|Wappen|Blason|H[eé]raldique|heraldic|Flag_of_|Stamp_|_stamp|stamps?\.|_stamps|\bstamps\b|Population_Density|population_density|Stick_chart|stick_chart|Armoiries|\bEscudo\b|_COA_|_COA\.|_coa\.|bandera|bandeira|Charta_|Emblem_of|Badge_of|Crest_of|Arms_of|demography|Commons-logo|pictogram|qr.?code|passport|wikidata|Peace_pact|Low_Elevation_Coastal|Coats_of_Arms|Asamblea_General|General_de_Naciones_Unidas|Refugees_|Soldiers_of_the_Forces|\.gif(?:\?|$)|Paris_Hilton|Portrait_of_|portrait_of_|Plan_of_|Site_plan|cadastral|Persia_\d|Persian_Gulf_\d|historical_map|Old_map|Carte_|Mapa_|Karte_|Marines_fly|signature|autograph|logo_of|Wordmark|Hilton_Cannes|\bMap_|\bmap_of_|_map\.|Annual_report|annual_report|Bataille_|Battle_of_|painting_by|oil_on_canvas|Collage|montage|OpenStreetMap|Official_Portrait|Tragelaphus|John_F_Kennedy/i;

export function isScenic(u) {
  return typeof u === "string" && u.length > 0 && !BAD_IMAGE.test(u);
}
