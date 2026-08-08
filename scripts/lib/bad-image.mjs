/**
 * Shared non-scenic image detector for travel heroes/galleries.
 * Keep this strict — stamps, COAs, density maps, flags must never ship.
 */
export const BAD_IMAGE =
  /flag[_ ]?of|\.svg(?:\?|$)|locator|orthographic|coat[_ ]?of[_ ]?arms|coats[_ ]?of[_ ]?arms|\bemblem\b|insignia|location_map|seal_of|BlankMap|political_map|world_map|Globe_icon|Wappen|Blason|H[eé]raldique|heraldic|Flag_of_|Stamp_|_stamp|stamps?\.|_stamps|\bstamps\b|Population_Density|population_density|Stick_chart|stick_chart|Armoiries|\bEscudo\b|_COA_|_COA\.|_coa\.|bandera|bandeira|Charta_|Emblem_of|Badge_of|Crest_of|Arms_of|demography|Commons-logo|pictogram|qr.?code|passport|wikidata|Peace_pact|Low_Elevation_Coastal|Coats_of_Arms|Asamblea_General|General_de_Naciones_Unidas|Refugees_|Soldiers_of_the_Forces/i;

export function isScenic(u) {
  return typeof u === "string" && u.length > 0 && !BAD_IMAGE.test(u);
}
