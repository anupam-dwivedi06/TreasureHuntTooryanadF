const pahelis = [
  // Spot 1 (7 pahelis)
  { id: "p1_001", spot: 1, question: "मैं बिना पंखों के उड़ता हूँ, बिना आँखों के रोता हूँ — मैं कौन हूँ?", answerId: "cloud_1" },
  { id: "p1_002", spot: 1, question: "ऐसी कौन सी चीज़ है जो जितना निकालो उतनी बड़ी हो जाती है?", answerId: "hole_1" },
  { id: "p1_003", spot: 1, question: "गोल है पर गेंद नहीं, पर इसकी परछाई बहुत बड़ी होती है?", answerId: "sun_1" },
  { id: "p1_004", spot: 1, question: "दिन में सोए, रात में जागे, बिना पंखों के उड़ता जाए?", answerId: "bat_1" },
  { id: "p1_005", spot: 1, question: "मैं जितना आगे बढ़ता हूँ, उतना पीछे छूटता जाता हूँ?", answerId: "footprints_1" },
  { id: "p1_006", spot: 1, question: "एक ऐसी चीज़ जो सिर्फ़ एक बार दी जा सकती है?", answerId: "promise_1" },
  { id: "p1_007", spot: 1, question: "एक शब्द में पाँच अक्षर, उल्टा भी वही है?", answerId: "malayalam_1" },

  // Spot 2 (7 pahelis)
  { id: "p2_001", spot: 2, question: "मैं बिना मुँह के बोलता हूँ, बिना कान के सुनता हूँ।", answerId: "echo_2" },
  { id: "p2_002", spot: 2, question: "रात में आता हूँ, दिन में ग़ायब हो जाता हूँ।", answerId: "stars_2" },
  { id: "p2_003", spot: 2, question: "मैं हमेशा आता हूँ, पर कभी पहुँचता नहीं हूँ।", answerId: "tomorrow_2" },
  { id: "p2_004", spot: 2, question: "बिना पैर के चलता है, पर मुड़कर कभी नहीं आता।", answerId: "water_2" },
  { id: "p2_005", spot: 2, question: "जब ज़रूरत हो तो फेंक देते हैं, जब ज़रूरत न हो तो उठा लेते हैं?", answerId: "anchor_2" },
  { id: "p2_006", spot: 2, question: "मेरा सिर नहीं, पर मैं सोच सकता हूँ।", answerId: "clock_2" },
  { id: "p2_007", spot: 2, question: "जितना भी खाओ, पेट नहीं भरता, प्यास भी नहीं बुझाता?", answerId: "eyes_2" },

  // Spot 3 (7 pahelis)
  { id: "p3_001", spot: 3, question: "जिसका सिर है पर दिमाग़ नहीं।", answerId: "pin_3" },
  { id: "p3_002", spot: 3, question: "मैं बोलता हूँ, पर मेरे पास मुँह नहीं।", answerId: "book_3" },
  { id: "p3_003", spot: 3, question: "मैं हर चीज़ को छोटा कर देता हूँ।", answerId: "telescope_3" },
  { id: "p3_004", spot: 3, question: "बिना पैर के चलता है, बिना पंखों के उड़ता है।", answerId: "smoke_3" },
  { id: "p3_005", spot: 3, question: "मैं हमेशा गीला रहता हूँ, पर पानी से नहीं।", answerId: "tongue_3" },
  { id: "p3_006", spot: 3, question: "मैं रोज़ आता हूँ, पर कोई मुझे देखना नहीं चाहता।", answerId: "night_3" },
  { id: "p3_007", spot: 3, question: "मैं काला हूँ, और लोग मुझे पसंद करते हैं।", answerId: "coffee_3" },

  // Spot 4 (7 pahelis)
  { id: "p4_001", spot: 4, question: "जिसके बिना घर सूना लगता है, पर वो चीज़ चीज़ नहीं।", answerId: "light_4" },
  { id: "p4_002", spot: 4, question: "मैं जितना तेज़ दौड़ता हूँ, उतना ही दूर चला जाता हूँ।", answerId: "time_4" },
  { id: "p4_003", spot: 4, question: "मैं एक चीज़ हूँ जो आप हर चीज़ में देख सकते हैं।", answerId: "reflection_4" },
  { id: "p4_004", spot: 4, question: "मैं बोलता हूँ, पर मेरे पास ज़ुबान नहीं।", answerId: "telephone_4" },
  { id: "p4_005", spot: 4, question: "मैं जितना पुराना होता हूँ, उतना ही नया दिखता हूँ।", answerId: "picture_4" },
  { id: "p4_006", spot: 4, question: "मैं हमेशा आता हूँ, पर कभी ठहरता नहीं।", answerId: "future_4" },
  { id: "p4_007", spot: 4, question: "मैं एक ऐसी चीज़ हूँ जो लोग खो देते हैं, पर कोई उसे ढूँढता नहीं।", answerId: "shadow_4" },

  // Spot 5 (7 pahelis)
  { id: "p5_001", spot: 5, question: "मैं जितना सूखता हूँ उतना ही गीला होता हूँ।", answerId: "towel_5" },
  { id: "p5_002", spot: 5, question: "मेरे पास एक सिर है, पर कोई दिमाग नहीं।", answerId: "nail_5" },
  { id: "p5_003", spot: 5, question: "मुझे जितना भी पीटो, मैं बोलता नहीं।", answerId: "drum_5" },
  { id: "p5_004", spot: 5, question: "मैं जितना गर्म होता हूँ, उतना ही पतला होता हूँ।", answerId: "wax_5" },
  { id: "p5_005", spot: 5, question: "मैं काला हूँ, लोग मुझे पसंद करते हैं।", answerId: "coffee_5" },
  { id: "p5_006", spot: 5, question: "मैं एक ऐसी चीज़ हूँ जो हर जगह है, पर कोई उसे देख नहीं सकता।", answerId: "air_5" },
  { id: "p5_007", spot: 5, question: "मैं जितना लिखता हूँ, उतना छोटा होता हूँ।", answerId: "chalk_5" },

  // Spot 6 (7 pahelis)
  { id: "p6_001", spot: 6, question: "एक ऐसी चीज जो पकड़ते ही टूट जाती है।", answerId: "silence_6" },
  { id: "p6_002", spot: 6, question: "मेरे पास गर्दन है, पर सिर नहीं।", answerId: "shirt_6" },
  { id: "p6_003", spot: 6, question: "जितना भी खाओ, पेट नहीं भरता।", answerId: "eyes_6" },
  { id: "p6_004", spot: 6, question: "एक चीज़ जो हमेशा ऊपर जाती है, पर कभी नीचे नहीं आती।", answerId: "age_6" },
  { id: "p6_005", spot: 6, question: "मैं एक ऐसी चीज़ हूँ जो हर चीज़ में है, पर कोई उसे देख नहीं सकता।", answerId: "hole_6" },
  { id: "p6_006", spot: 6, question: "मैं जितना भी छोटा हो जाऊँ, मैं उतना ही बड़ा दिखता हूँ।", answerId: "word_6" },
  { id: "p6_007", spot: 6, question: "मैं जितना आगे बढ़ता हूँ, उतना ही पीछे छूटता जाता हूँ।", answerId: "road_6" },

  // Spot 7 (7 pahelis)
  { id: "p7_001", spot: 7, question: "कौन सा कमरा है जिसमें दरवाज़े-खिड़कियाँ नहीं होतीं?", answerId: "mushroom_7" },
  { id: "p7_002", spot: 7, question: "एक चीज़ जो हमेशा भागती रहती है, पर कभी थकती नहीं।", answerId: "river_7" },
  { id: "p7_003", spot: 7, question: "एक ऐसी चीज़ जो हर जगह है, पर कोई उसे पकड़ नहीं सकता।", answerId: "wind_7" },
  { id: "p7_004", spot: 7, question: "मैं एक ऐसी चीज़ हूँ जो हर चीज़ में है, पर कोई उसे देख नहीं सकता।", answerId: "hole_7" },
  { id: "p7_005", spot: 7, question: "मैं जितना भी खाओ, पेट नहीं भरता।", answerId: "eyes_7" },
  { id: "p7_006", spot: 7, question: "मैं एक ऐसी चीज़ हूँ जो हमेशा आता हूँ, पर कभी ठहरता नहीं।", answerId: "future_7" },
  { id: "p7_007", spot: 7, question: "मैं एक ऐसी चीज़ हूँ जो हमेशा भागती रहती है, पर कभी थकती नहीं।", answerId: "time_7" },
];

export default pahelis;