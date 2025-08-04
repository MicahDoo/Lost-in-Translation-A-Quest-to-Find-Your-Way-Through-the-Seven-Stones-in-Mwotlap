// story-data.js - Updated with percentage-based transparent speech bubble positioning
const storyData = {
    scenes: [
        {
            id: "discovery",
            title: {
                en: "The Discovery",
                zh: "發現"
            },
            content: {
                en: [
                    {
                        type: "paragraph",
                        text: `It all began with a bottle washed ashore.
                            David, a travel blogger drawn to the unexpected, found it half-buried in the sand months ago at a remote Taiwanese beach. 
                            Inside was a letter—weathered, sun-bleached, and written in a language he couldn’t recognize. 
                            Years later, he showed this letter to a new friend, and to his surprise, this new friend could read most of it.`
                    },
                    {
                        type: "paragraph",
                        text: `This new friend is Vetea, a young man from Vanuatu who spoke Mwotlap—a language spoken by only around 2,000 people on the island of Motalava. 
                            He read the letter, which is written in his exact language, Mwotlap. It described seven mystic stones hidden across the islands, along with directions to find them. 
                            Three matched the description of stones once discovered by his grandfather—mysterious, glimmering relics etched with unexplainable patterns.
                            According to the letter, the author—a Mwotlap traveler—had scattered the stones across Vanuatu, turning their hiding places into a game, and leaving clues behind for those curious enough to follow.
                            \nNow, with mystery calling and clues in hand, David joins Vetea on a journey into the heart of the Pacific—chasing legends, decoding directions, and hunting for the lost Seven Mystic Stones.`
                    },
                    {
                        type: "paragraph",
                        text: `But fate had other plans.
                            Some time into their search, Vetea was injured in an accident and has been in a coma ever since.\n
                            Knowing time isn’t on his side–and suspecting that others who saw the letter online might also be after the stones–David decides to press on alone. His only clues? The cryptic letter, the paths they’ve travelled (now carefully marked on his map), and his past interactions with Vetea’s grandfather, Kaikoa.
                            Trying to recall as many details as he can about the language and the clues, David’s memory drifts back to the beginning of their journey–to Motalava, where Mwotlap is primarily spoken, and to Kaikoa’s warm welcome that first set everything in motion.`
                    },
                    {
                        type: "comic",
                        image: "images/1-1. Greeting.png",
                        alt: "David finding the bottle on beach",
                        speechBubbles: []
                    },
                    {
                        type: "comic",
                        image: "images/1-2. Come inland.png",
                        alt: "Kaikoa gestures them inland",
                        speechBubbles: [
                            {
                                text: "Gēn van hay!",
                                left: 55,
                                top: 7,
                                width: 23,
                                height: 10
                            }
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "The incredible journey started with Kaikoa showing them around."
                    }
                ],
                zh: [
                    {
                        type: "paragraph",
                        text: "這一切都始於一個被沖上岸的瓶子。大衛是一名被意外所吸引的旅行部落客，幾個月前在台灣一個偏遠海灘上發現了這個半埋在沙中的瓶子。裡面有一封信——經受風雨侵蝕、被陽光漂白，用他無法辨認的語言寫成。"
                    },
                    {
                        type: "comic",
                        image: "images/1-1. Greeting.png",
                        alt: "大衛在台灣海灘發現神秘瓶子",
                        speechBubbles: []
                    },
                    {
                        type: "paragraph",
                        text: "他向Reddit求助。幾週過去了，然後是幾個月。就在他準備放棄的時候，終於收到了一條訊息，來自瓦努阿圖的年輕人維提亞，他會說莫特拉普語——一種只有約2000人在莫塔拉瓦島上使用的語言。"
                    }
                ]
            }
        },
        {
            id: "journey-begins",
            title: {
                en: "The Journey",
                zh: "旅程"
            },
            content: {
                en: [
                    {
                        type: "paragraph",
                        text: "Now, with mystery calling and clues in hand, David joined Vetea on a journey into the heart of the Pacific—chasing legends, decoding directions, and hunting for the lost Seven Mystic Stones. The incredible journey started with Kaikoa showing them around from his watchtower, pointing out landmarks and the locations where he had discovered the first three stones."
                    },
                    {
                        type: "comic",
                        image: "path/to/your/comic2.png",
                        alt: "Kaikoa showing them the watchtower",
                        speechBubbles: [
                            {
                                text: "Gēn van hag!",
                                left: 30,
                                top: 15,
                                width: 25,
                                height: 10
                            }
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "\"Gēn van hag!\" Kaikoa called out, gesturing toward the eastern horizon."
                    },
                    {
                        type: "paragraph",
                        text: "But fate had other plans..."
                    }
                ],
                zh: [
                    {
                        type: "paragraph",
                        text: "現在，帶著神秘的召喚和手中的線索，大衛與維提亞一起踏上了深入太平洋心臟地帶的旅程——追尋傳說、解碼方向、尋找失落的七顆神秘寶石。這段不可思議的旅程始於卡伊科阿從他的瞭望塔帶領他們參觀，指出地標和他發現前三顆石頭的位置。"
                    },
                    {
                        type: "comic",
                        image: "path/to/your/comic2.png",
                        alt: "卡伊科阿在瞭望塔指引方向",
                        speechBubbles: [
                            {
                                text: "Gēn van hag!",
                                left: 30,
                                top: 15,
                                width: 25,
                                height: 10
                            }
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "「Gēn van hag！」卡伊科阿大聲喊道，朝著東方地平線做手勢。"
                    },
                    {
                        type: "paragraph",
                        text: "但命運另有安排..."
                    }
                ]
            }
        },
        {
            id: "tragic-accident",
            title: {
                en: "The Accident",
                zh: "事故"
            },
            content: {
                en: [
                    {
                        type: "paragraph",
                        text: "During their search on Happy Island, David mistakenly dug under the wrong rock, triggering an explosive device. Vetea immediately recognized the countdown beeps and realized it was planted by the puzzle creator to eliminate wrong choices. In panic, he yelled \"That's not what yow means here!\" and threw himself at David to push him away, landing on the bomb himself."
                    },
                    {
                        type: "comic",
                        image: "path/to/your/comic3.jpg",
                        alt: "The tragic accident - Vetea shouting",
                        speechBubbles: [
                            {
                                text: "That's not what yow means here!",
                                left: 55,
                                top: 20,
                                width: 35,
                                height: 12
                            }
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "The explosion sent Vetea into a coma."
                    },
                    {
                        type: "paragraph",
                        text: "Now David faces the remaining challenges alone, with only his fragmentary knowledge of Mwotlap directional systems to guide him."
                    }
                ],
                zh: [
                    {
                        type: "paragraph",
                        text: "在快樂島的搜尋過程中，大衛錯誤地在錯誤的石頭下挖掘，觸發了一個爆炸裝置。維提亞立即識別出倒數計時的嗶嗶聲，意識到這是謎題創作者設置的，用來淘汰錯誤選擇的人。在恐慌中，他大喊「yow在這裡不是那個意思！」並撲向大衛想要推開他，結果自己落在了炸彈上。"
                    },
                    {
                        type: "comic",
                        image: "path/to/your/comic3.jpg",
                        alt: "悲劇事故 - 維提亞大喊",
                        speechBubbles: [
                            {
                                text: "yow在這裡不是那個意思！",
                                left: 55,
                                top: 20,
                                width: 35,
                                height: 12
                            }
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "爆炸使維提亞陷入昏迷。"
                    },
                    {
                        type: "paragraph",
                        text: "現在大衛必須獨自面對剩下的挑戰，只能依靠他對莫特拉普語方向系統的片段知識來指引他。"
                    }
                ]
            }
        },
        {
            id: "transition-1",
            title: {
                en: "David Continues Alone",
                zh: "大衛獨自繼續"
            },
            content: {
                en: [
                    {
                        type: "paragraph",
                        text: "Even knowing that this quest doesn't allow mistakes, David picks up the letter and maps, determined to solve the puzzle for the other huts. He must use the Mwotlap directional clues to determine the correct positions of huts A, B, and C relative to the chapel."
                    }
                ],
                zh: [
                    {
                        type: "paragraph",
                        text: "即使知道這個任務不允許犯錯，大衛還是拿起信件和地圖，決心要解決其他小屋的謎題。他必須使用莫特拉普語的方向線索來確定小屋A、B和C相對於教堂的正確位置。"
                    }
                ]
            }
        },
        {
            id: "asking-residents",
            title: {
                en: "Asking the Residents",
                zh: "詢問居民"
            },
            content: {
                en: [
                    {
                        type: "paragraph",
                        text: "This time, David can't find any totem poles near the huts - the residents seem to have removed them. So he decides to ask the residents directly, using his painting skills to illustrate each hut and then asking which one had a totem pole in the correct location."
                    },
                    {
                        type: "comic",
                        image: "path/to/your/comic4.jpg",
                        alt: "David asking residents about the totem poles",
                        speechBubbles: []
                    },
                    {
                        type: "paragraph",
                        text: "The residents looked at his drawings with interest, pointing and discussing in rapid Mwotlap."
                    }
                ],
                zh: [
                    {
                        type: "paragraph",
                        text: "這一次，大衛在小屋附近找不到任何圖騰柱——居民們似乎已經移除了它們。所以他決定直接詢問居民，利用他的繪畫技巧來描繪每個小屋，然後詢問哪一個在正確位置有圖騰柱。"
                    },
                    {
                        type: "comic",
                        image: "path/to/your/comic4.jpg",
                        alt: "大衛詢問居民關於圖騰柱的情況",
                        speechBubbles: []
                    },
                    {
                        type: "paragraph",
                        text: "居民們興趣盎然地看著他的圖畫，指著並用快速的莫特拉普語討論著。"
                    }
                ]
            }
        },
        {
            id: "conclusion",
            title: {
                en: "The Quest Continues",
                zh: "任務繼續"
            },
            content: {
                en: [
                    {
                        type: "paragraph",
                        text: "With the residents' help and his growing understanding of Mwotlap spatial systems, David finally solves the puzzle and finds the location of Stone E. The treasure hunt continues, but now he carries not just the weight of the remaining stones to find, but also the hope that Vetea will recover to see their quest completed."
                    },
                    {
                        type: "paragraph",
                        text: "The adventure continues, but the linguistic puzzles end here...",
                        style: "text-align: center; margin-top: 30px; font-weight: bold;"
                    }
                ],
                zh: [
                    {
                        type: "paragraph",
                        text: "在居民的幫助和他對莫特拉普語空間系統的不斷理解下，大衛終於解開了謎題，找到了寶石E的位置。尋寶之旅還在繼續，但現在他不僅承載著尋找剩餘寶石的重任，也承載著維提亞能夠康復並看到他們任務完成的希望。"
                    },
                    {
                        type: "paragraph",
                        text: "冒險還在繼續，但語言學謎題到此結束...",
                        style: "text-align: center; margin-top: 30px; font-weight: bold;"
                    }
                ]
            }
        }
    ],
    
    challenges: [
        {
            id: "challenge-1",
            title: {
                mwt: "Qele ave \"yow\" aē?",
                adv: "Figure out what Vetea means"
            },
            content: {
                mwt: {
                    question: "David m-et so teytey qele ave Vetea m-et me-helhleh \"That's not what yow means here!\" Nēk so teytey ave na-tqoy mwotlap \"yow\" aē qele liwo?",
                    hint: "Van m̄ōl le-mdal na-tbēq directional system a Mwotlap. \"Yow\" so et matmat qiyig aē context ave?",
                    answer: "\"Yow\" aē directional geocentric (seawards) ba deictic context aē different. Vetea m-et so teytey ave David m-et so van-tamat \"yow\" aē absolute direction ba no local/relative position."
                },
                adv: {
                    question: "You must decode why Vetea shouted about \"yow\" meaning something different. Consider the difference between <strong>geocentric</strong> vs <strong>deictic</strong> usage of Mwotlap directionals in different spatial scales.",
                    hint: "The letter uses \"yow\" consistently, but Happy Island context requires understanding whether this refers to absolute geographic directions or relative positions from a specific viewpoint.",
                    answer: "Geocentric vs. deictic directional interpretation. \"Yow\" functions as absolute geocentric reference (seawards) in letter context but requires deictic/relative interpretation at local scale on Happy Island."
                }
            }
        },
        {
            id: "challenge-2",
            title: {
                mwt: "Sok n-ēm̄ su ABC",
                adv: "Map the Hut Constellation"
            },
            content: {
                mwt: {
                    question: "Na-tbēq gēn aē:<br><div class=\"mwotlap-text\"><p>N-ēm̄ su A tog tô lok hag l-ēm̄ yon̄. N-ēm̄ yon tog tô lok hōw l-ēm̄ su A.<br>N-ēm̄ su B tog tô lok yow l-ēm̄ yon̄. N-ēm̄ yon tog tô lok hay l-ēm̄ su B.<br>N-ēm̄ su C tog tô lok hōw l-ēm̄ su B. N-ēm̄ su B tog tô lok hag l-ēm̄ su C.</p></div>Qele tateh nēk so van-dēmdēm na-tqoy \"lok\" gēn? Na-lēk spatial relation aē qele liwo?",
                    hint: "",
                    answer: "Na-map spatial relations: Chapel tog center, Hut A tog hag (east), Hut B tog yow (seawards), Hut C tog between B wa chapel lok hōw."
                },
                adv: {
                    question: "Using advanced Mwotlap spatial construction patterns with <strong>mediate reference</strong> (lok + directional), decode the relative positions:<br><div class=\"mwotlap-text\"><p>Hut A is 'hag'-ward of chapel; chapel is 'hōw'-ward of Hut A<br>Hut B is 'yow'-ward of chapel; chapel is 'hay'-ward of Hut B<br>Hut C is 'hōw'-ward of Hut B; Hut B is 'hag'-ward of Hut C</p></div>",
                    hint: "Advanced analysis required: Apply understanding of reciprocal spatial relationships and directional systems to create accurate positioning map.",
                    answer: "Mediate reference system analysis: lok + directional creates reciprocal spatial relationships. Solution requires mapping all constraints simultaneously to determine unique hut constellation."
                }
            }
        },
        {
            id: "challenge-3",
            title: {
                mwt: "Qele tateh David so ni-visa?",
                adv: "Formulate the Critical Question"
            },
            content: {
                mwt: {
                    question: "David so teyhē so ni-visa ige: \"Mey ave n-ēm̄ su, na-han̄ ēm̄ ne-vet aē yow l-ēm̄ ōk?\"<br><br>Ba nēk m-et so mat qele ave na-tbēq spatial construction gēn aē no-qon? Qele tateh nēk so tēy na-visa mwotlap tateh aē?",
                    hint: "Na-lēk existential predicate wa interrogative construction patterns.",
                    answer: "\"Mey ave n-ēm̄ su, na-han̄ ēm̄ ne-vet aē yow l-ēm̄ ōk?\" (Which hut has a stone/totem on its yow side?)"
                },
                adv: {
                    question: "David needs to ask: \"Which hut has a rock/totem pole on its 'yow' side?\"<br><br>Construct this question using proper Mwotlap syntax, considering:<br><ul style=\"text-align: left; margin: 15px 0;\"><li><strong>Interrogative formation</strong> with \"mey ave\" (which one)</li><li><strong>Existential/possessive construction</strong> patterns</li><li><strong>Spatial relation encoding</strong> with locative prefixes</li><li><strong>Mediate reference systems</strong> for relative positioning</li></ul>",
                    hint: "Advanced Challenge: Your answer should demonstrate mastery of Mwotlap morphosyntactic patterns beyond basic directional vocabulary.",
                    answer: "Morphosyntactic construction: [mey ave] + [n-ēm̄ su] + [existential predicate] + [spatial locative]. Demonstrates mastery of interrogative + possessive + spatial systems."
                }
            }
        }
    ]
};
