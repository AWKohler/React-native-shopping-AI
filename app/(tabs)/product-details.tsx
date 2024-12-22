// // app/(tabs)/product-details.tsx

// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';
// import { useSearchParams } from 'expo-router';

// interface Seller {
//   position: number;
//   name: string;
//   link: string;
//   base_price: string;
//   // Add more if needed
// }

// export default function ProductDetailsScreen() {
//   const { productId } = useSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [details, setDetails] = useState<any>(null);

//   useEffect(() => {
//     if (productId) {
//       fetchDetails(productId as string);
//     }
//   }, [productId]);

//   const fetchDetails = async (id: string) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch('/api/productDetails', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ product_id: id }),
//       });
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
//       const data = await response.json();
//       setDetails(data);
//     } catch (err: any) {
//       setError(err.message ?? 'Failed to fetch product details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSellerPress = (link: string) => {
//     if (link) {
//       Linking.openURL(link);
//     }
//   };

//   if (!productId) {
//     return (
//       <View style={styles.centered}>
//         <Text>No productId provided.</Text>
//       </View>
//     );
//   }

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#999" />
//         <Text>Loading details...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={{ color: 'red' }}>{error}</Text>
//       </View>
//     );
//   }

//   if (!details) {
//     return (
//       <View style={styles.centered}>
//         <Text>No details found for this product.</Text>
//       </View>
//     );
//   }

//   // Extract the relevant fields from your big PS5 JSON structure
//   const productInfo = details?.product_results || {};
//   const sellers = details?.sellers_results?.online_sellers || [];
//   const { title, rating, reviews, prices, description, media } = productInfo;

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>{title}</Text>

//       {/* Horizontal image scroller */}
//       {media?.length > 0 && (
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
//           {media
//             .filter((m: any) => m.type === 'image')
//             .map((img: any, idx: number) => (
//               <Image 
//                 key={idx} 
//                 source={{ uri: img.link }} 
//                 style={styles.productImage} 
//                 resizeMode="contain" 
//               />
//             ))
//           }
//         </ScrollView>
//       )}

//       {/* Rating & Reviews */}
//       <View style={styles.row}>
//         {rating != null && <Text style={styles.ratingText}>{`★ ${rating.toFixed(1)}`}</Text>}
//         {reviews && <Text style={styles.reviewsText}>{`${reviews.toLocaleString()} reviews`}</Text>}
//       </View>

//       {/* Prices */}
//       {Array.isArray(prices) && prices.length > 0 && (
//         <Text style={styles.priceText}>Typical Prices: {prices.join(' / ')}</Text>
//       )}

//       {/* Description */}
//       {description && <Text style={styles.description}>{description}</Text>}

//       {/* Sellers */}
//       <Text style={styles.sectionHeader}>Where to Buy</Text>
//       {sellers.map((seller: Seller, index: number) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.sellerContainer}
//           onPress={() => handleSellerPress(seller.link)}
//         >
//           <Text style={styles.sellerName}>{seller.name}</Text>
//           <Text style={styles.sellerPrice}>{seller.base_price}</Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1, 
//     alignItems: 'center', 
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f3f3f3',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 12,
//   },
//   productImage: {
//     width: 200,
//     height: 200,
//     marginRight: 16,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   ratingText: {
//     color: '#facc15',
//     fontSize: 16,
//     fontWeight: '600',
//     marginRight: 8,
//   },
//   reviewsText: {
//     fontSize: 12,
//     color: '#4b5563',
//   },
//   priceText: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 14,
//     lineHeight: 20,
//     marginBottom: 16,
//     color: '#333',
//   },
//   sectionHeader: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 8,
//   },
//   sellerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#fafafa',
//     borderRadius: 6,
//     padding: 12,
//     marginBottom: 8,
//     alignItems: 'center',
//   },
//   sellerName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },
//   sellerPrice: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1f2937',
//   },
// });


// app/(tabs)/product-details.tsx




// const dataa = {
//     "search_metadata": {
//       "id": "6767066563fc6b6319bf0128",
//       "status": "Success",
//       "json_endpoint": "https://serpapi.com/searches/c8f1da1b42e2c90d/6767066563fc6b6319bf0128.json",
//       "created_at": "2024-12-21 18:18:13 UTC",
//       "processed_at": "2024-12-21 18:18:13 UTC",
//       "google_product_url": "https://www.google.com/shopping/product/4887235756540435899?gl=us&hl=en&prds=pid:4887235756540435899&sourceid=chrome&ie=UTF-8",
//       "raw_html_file": "https://serpapi.com/searches/c8f1da1b42e2c90d/6767066563fc6b6319bf0128.html",
//       "total_time_taken": 0.25
//     },
//     "search_parameters": {
//       "engine": "google_product",
//       "product_id": "4887235756540435899",
//       "google_domain": "google.com",
//       "hl": "en",
//       "gl": "us",
//       "device": "desktop"
//     },
//     "product_results": {
//       "product_id": "4887235756540435899",
//       "title": "Sony PlayStation 5 - Digital Edition",
//       "prices": [
//         "$374.99",
//         "$399.99",
//         "$613.79"
//       ],
//       "conditions": [
//         "New",
//         "New",
//         "New"
//       ],
//       "typical_prices": {
//         "shown_price": "$374.99 at PayMore Massapequa"
//       },
//       "reviews": 13797,
//       "rating": 4.6,
//       "extensions": [
//         "Blu-ray Compatible",
//         "Digital Edition",
//         "4K Capable",
//         "PlayStation Network",
//         "With Motion Control",
//         "White",
//         "Bluetooth",
//         "Wi-Fi",
//         "With Expandable Storage"
//       ],
//       "description": "Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games. Lightning speed Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrites the rules of what a PlayStation console can do. Ultra-High-Speed SSD Maximize your play sessions with near-instant load times for installed PS5 games. Integrated I/O The custom integration of the PS5 console's systems lets creators pull data from the SSD so quickly that they can design games in ways never before possible. Ray tracing Immerse yourself in worlds with a new level of realism as rays of light are individually simulated, creating true-to-life shadows and reflections in supported PS5 games. 4K-TV gaming Play your favorite PS5 games on your stunning 4K TV. Up to 120fps with 120Hz output Enjoy smooth and fluid high frame rate gameplay at up to 120fps for compatible games, with support for 120Hz output on 4K displays. HDR technology With an HDR TV, supported PS5 games display an unbelievably vibrant and lifelike range of colors. 8K output PS5 consoles support 8K Output, so you can play games on your 4320p resolution display.",
//       "media": [
//         {
//           "type": "image",
//           "link": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRLAwuDsG43b4vH1dADUNozgbk_5wfPAxPjnjPpE1Bz7cbizv4&usqp=CAY"
//         },
//         {
//           "type": "image",
//           "link": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRKh3TXDeVk4mPVhTE_s0_tE9zDA2nLG91yI2bUDg8-ept9KOYPOg6uYU8aRyLgh7bAZMKGtQfuNDfbEw3RPDglC9-NCJYfmw&usqp=CAY"
//         },
//         {
//           "type": "image",
//           "link": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTtrwKAXXSqOUqJSwrH9MCrTpSJwSYGKYNXXv_A85LJdnuCG9_JiLx6H76KZ77QKATI33LG7M6WmMSFqIIRGaStHmMfSq8e&usqp=CAY"
//         }
//       ],
//       "highlights": [
//         "The PS5 Digital Edition unleashes new gaming possibilities that you never anticipated",
//         "Lightning Speed",
//         "Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do",
//         "Stunning Games"
//       ]
//     },
//     "sellers_results": {
//       "online_sellers": [
//         {
//           "position": 1,
//           "name": "PayMore Massapequa",
//           "payment_methods": "PayPal, Google Pay, Shop Pay & more accepted",
//           "link": "https://www.google.com/url?q=https://massapequany.paymore.com/products/sony-playstation-5-ps5-disc-version-825gb-white-cfi-1015a%3Fvariant%3D38128913973436%26country%3DUS%26currency%3DUSD%26utm_medium%3Dproduct_sync%26utm_source%3Dgoogle%26utm_content%3Dsag_organic%26utm_campaign%3Dsag_organic%26srsltid%3DAfmBOorwcEI1KwoiAvd2rZ3IIGklz_zdmIciiC7uUVbP4I53_Vqc1N3ZdqQ&opi=95576897&sa=U&ved=0ahUKEwicqtrKvLmKAxUeMlkFHXkJFbAQ2ykIWA&usg=AOvVaw0t0pdnYMCFVmg3PcPf28-G",
//           "direct_link": "https://massapequany.paymore.com/products/sony-playstation-5-ps5-disc-version-825gb-white-cfi-1015a?variant=38128913973436&country=US&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOorwcEI1KwoiAvd2rZ3IIGklz_zdmIciiC7uUVbP4I53_Vqc1N3ZdqQ",
//           "details_and_offers": [
//             {
//               "text": "Delivery date & cost shown at checkout"
//             }
//           ],
//           "base_price": "$374.99",
//           "additional_price": {
//             "shipping": "See website",
//             "tax": "$29.06"
//           },
//           "total_price": "$404.05"
//         },
//         {
//           "position": 2,
//           "name": "BUYA.COM",
//           "link": "https://www.google.com/url?q=https://www.buya.com/Item/Details/SONY-PS5-PLAYSTATION-5-SYSTEM-SLIM-CFI-2015/lite/9d31a8ac310b4ac3a313a1d201f31b37&opi=95576897&sa=U&ved=0ahUKEwicqtrKvLmKAxUeMlkFHXkJFbAQ2ykIXQ&usg=AOvVaw2yXCq6rDcDXjjxUl9GlcOe",
//           "direct_link": "https://www.buya.com/Item/Details/SONY-PS5-PLAYSTATION-5-SYSTEM-SLIM-CFI-2015/lite/9d31a8ac310b4ac3a313a1d201f31b37",
//           "details_and_offers": [
//             {
//               "text": "Delivery date & cost shown at checkout"
//             }
//           ],
//           "base_price": "$399.99",
//           "additional_price": {
//             "shipping": "See website",
//             "tax": "$0.00"
//           },
//           "total_price": "$399.99",
//           "offer_id": "16130301",
//           "offer_link": "https://www.google.com/shopping/product/4887235756540435899/plusbox/16130301?hl=en&gl=us&prds=eto:5572690759115309060_0,pid:9775745750560217909,rsk:PC_10252959786065141094",
//           "serpapi_offer_link": "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=us&google_domain=google.com&hl=en&offer_id=16130301&product_id=4887235756540435899"
//         },
//         {
//           "position": 3,
//           "name": "Bonanza - BundleGalore's Booth",
//           "payment_methods": "PayPal, Amazon Pay accepted",
//           "link": "https://www.google.com/url?q=https://www.bonanza.com/listings/Sony-PS5-Digital-Edition-Console-Brand-New-Never-Opened/1531883445%3Fgoog_pla%3D1&opi=95576897&sa=U&ved=0ahUKEwicqtrKvLmKAxUeMlkFHXkJFbAQ2ykIYQ&usg=AOvVaw0N5Najc7gIbbGH7VJ_NBlE",
//           "direct_link": "https://www.bonanza.com/listings/Sony-PS5-Digital-Edition-Console-Brand-New-Never-Opened/1531883445?goog_pla=1",
//           "details_and_offers": [
//             {
//               "text": "Delivery date & cost shown at checkout"
//             }
//           ],
//           "base_price": "$613.79",
//           "additional_price": {
//             "shipping": "See website",
//             "tax": "$49.12"
//           },
//           "total_price": "$662.91"
//         }
//       ]
//     },
//     "specs_results": {
//       "details": {
//         "manufacturer_warranty": "1 Year",
//         "year_manufactured": "2022",
//         "platform": "Sony PlayStation 5",
//         "item_length": "10.2 in (25.9 cm) (25.9 cm)",
//         "item_height": "15.4 in (39.1 cm) (39.1 cm)"
//       }
//     },
//     "reviews_results": {
//       "ratings": [
//         {
//           "stars": 1,
//           "amount": 807
//         },
//         {
//           "stars": 2,
//           "amount": 206
//         },
//         {
//           "stars": 3,
//           "amount": 340
//         },
//         {
//           "stars": 4,
//           "amount": 1260
//         },
//         {
//           "stars": 5,
//           "amount": 11184
//         }
//       ],
//       "filters": [
//         {
//           "label": "Performs well",
//           "count": 1128
//         },
//         {
//           "label": "Attractive",
//           "count": 438
//         },
//         {
//           "label": "Comfortable to use",
//           "count": 175
//         },
//         {
//           "label": "Easy to use",
//           "count": 157
//         },
//         {
//           "label": "Bulky",
//           "count": 118
//         },
//         {
//           "label": "Quality build",
//           "count": 91
//         },
//         {
//           "label": "Easy to set up",
//           "count": 107
//         },
//         {
//           "label": "Battery life",
//           "count": 41
//         },
//         {
//           "label": "Quality display",
//           "count": 37
//         },
//         {
//           "label": "Charges quickly",
//           "count": 29
//         }
//       ],
//       "reviews": [
//         {
//           "position": 1,
//           "date": "August 20, 2024",
//           "rating": 5,
//           "source": "troyeisha.h · Review provided by influenster.com",
//           "content": "A longtime PlayStation fan, I had been putting off getting a PS5 until the three following milestones occurred: 1) a reduction in size of the console 2) a reduction in the price of the console 3) a reduction in the price of games for the console I thought that the introduction of the PS5 Slim last fall would spur my purchase, but Sony didn't cut the price, and even older PS5 games were still selling for $70. But finally, during the Days of Play event this spring, Sony knocked $50 off the console's price -- I didn't want the Spiderman or COD bundles, not my favorite games -- and I decided to act. Four years is a LONG time to wait to play a new RC title, after all! So here are my thoughts on the PS5, now that's in my house: 1) Setup is remarkably easy, including wirelessly transferring game save information from a PS4. It did take me a while to figure out how to turn off the female voice heralding all my actions (under Accessibility options). 2) The PS5 runs like a champ. So far, I have not been aware of any fan noises or clouds of warm air exhaust spewing out. 3) The DualSense controllers had weaker rumble than I expected. It turns out that the rumble motors default to the \"weak\" setting if you have the controller's microphone enabled. I turned off the mike, and the rumble was back at full force, but with more finesse than that experienced with the PS4's DUALSHOCK controllers. If I'm not mistaken, the precision of the DS controller actually seems to improve my game scores... 4) The new user interface is kind of a mess. In particular, leaving the POWER button off the Home page was a boneheaded move. One of my first issues with the new console was -- how do I turn this bloody beast OFF??? I wish that the controller battery gauge was on the Home page as well. 5) It was a brilliant idea making the disk drive detachable. The one problem I had with my PS4 involved the machine's failure to read disks after a few years, which I am guessing was an issue of a dirty reading head; I sent the console to Sony to be fixed, and it came back working perfectly in one week. Now I assume I can just repair or replace the removable drive without sending in the entire console for repair... 6) Now that the PS5 packs 1 TB of memory, I was wondering how soon I would need to add more memory. Currently, I have plenty of memory to switch back and forth between a number of games, including Ratchet Clank Rift Apart, plus several from the PS4, including WRC Generations, Far Cry 6, and Resident Evil 4, as well as the Pinball Arcade. One good reason I wanted the disk version of the PS5 was to minimize the size of game downloads to preserve memory. 7) The audio/video performance of the PS5 to play back DVD's and Blu-Rays is outstanding. And I was happy to find that the excellent Bluetooth PDP media controller I got for the PS4 works with the PS5 as well. Yea -- that made me feel better about spending $30 for the PS5's vertical stand instead! 8) And some of the PS5 titles are FINALLY coming down in price: Rift Apart and the latest Star Wars game, for example -- two AAA titles -- are now available for a far more affordable $30. So if you have been putting off upgrading to a PS5, it may be time at last to make the move, provided you can catch a special promotion. And to those who say, \"Game consoles' days are numbered,\" I say -- as long as many of us prefer to play games sitting on a couch, enveloped in booming 3D sound and watching our dazzling big-screen TV's -- long live PlayStation consoles -- especially those that serve as a 2-in-1 machine, with built-in (or detachable) disk drives that also play DVD's and BR's! "
//         }
//       ]
//     }
//   };




// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   StyleSheet,
//   Linking,
//   TouchableOpacity,
//   Image,
//   SafeAreaView
// } from 'react-native';
// // Use 'useLocalSearchParams' from expo-router
// import { useLocalSearchParams } from 'expo-router';

// interface Seller {
//   position: number;
//   name: string;
//   link: string;
//   base_price: string;
//   // Add more fields if needed
// }

// export default function ProductDetailsScreen() {
//   // Instead of useSearchParams, we use useLocalSearchParams
//   const { productId } = useLocalSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [details, setDetails] = useState<any>(null);

//   useEffect(() => {
//     if (productId) {
//       fetchDetails(productId as string);
//     }
//   }, [productId]);

//   const fetchDetails = async (id: string) => {
//     try {

//         console.log("fetching_details")

//       setLoading(true);
//       setError(null);

//       const response = await fetch('http://localhost:8081/api/productDetails', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ product_id: id }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
//       const data = await response.json();
      

//       console.log(data)
//       console.log("done")

//       setDetails(data);
//     } catch (err: any) {
//       setError(err.message ?? 'Failed to fetch product details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSellerPress = (link: string) => {
//     if (link) {
//       Linking.openURL(link);
//     }
//   };

//   if (!productId) {
//     return (
//       <View style={styles.centered}>
//         <Text>No productId provided.</Text>
//       </View>
//     );
//   }

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#999" />
//         <Text>Loading details...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={{ color: 'red' }}>{error}</Text>
//       </View>
//     );
//   }

//   if (!details) {
//     return (
//       <View style={styles.centered}>
//         <Text>No details found for this product.</Text>
//       </View>
//     );
//   }

//   // Extract relevant fields from the SerpAPI JSON:
//   const productInfo = details?.product_results || {};
//   const sellers = details?.sellers_results?.online_sellers || [];
//   const { title, rating, reviews, prices, description, media } = productInfo;

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
//         <ScrollView style={styles.container}>
//         <Text style={styles.title}>{title}</Text>

//         {/* Horizontal image scroller */}
//         {Array.isArray(media) && media.length > 0 && (
//             <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={{ marginBottom: 12 }}
//             >
//             {media
//                 .filter((m: any) => m.type === 'image')
//                 .map((img: any, idx: number) => (
//                 <Image
//                     key={idx}
//                     source={{ uri: img.link }}
//                     style={styles.productImage}
//                     resizeMode="contain"
//                 />
//                 ))}
//             </ScrollView>
//         )}

//         {/* Rating & Reviews */}
//         <View style={styles.row}>
//             {rating != null && (
//             <Text style={styles.ratingText}>{`★ ${rating.toFixed(1)}`}</Text>
//             )}
//             {reviews && (
//             <Text style={styles.reviewsText}>{`${reviews.toLocaleString()} reviews`}</Text>
//             )}
//         </View>

//         {/* Prices */}
//         {Array.isArray(prices) && prices.length > 0 && (
//             <Text style={styles.priceText}>Prices: {prices.join(' / ')}</Text>
//         )}

//         {/* Description */}
//         {description && <Text style={styles.description}>{description}</Text>}

//         {/* Sellers */}
//         <Text style={styles.sectionHeader}>Where to Buy</Text>
//         {sellers.map((seller: Seller, index: number) => (
//             <TouchableOpacity
//             key={index}
//             style={styles.sellerContainer}
//             onPress={() => handleSellerPress(seller.link)}
//             >
//             <Text style={styles.sellerName}>{seller.name}</Text>
//             <Text style={styles.sellerPrice}>{seller.base_price}</Text>
//             </TouchableOpacity>
//         ))}
//         </ScrollView>
//     </SafeAreaView>

    
//   );
// }

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f3f3f3',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 12,
//   },
//   productImage: {
//     width: 200,
//     height: 200,
//     marginRight: 16,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   ratingText: {
//     color: '#facc15',
//     fontSize: 16,
//     fontWeight: '600',
//     marginRight: 8,
//   },
//   reviewsText: {
//     fontSize: 12,
//     color: '#4b5563',
//   },
//   priceText: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 14,
//     lineHeight: 20,
//     marginBottom: 16,
//     color: '#333',
//   },
//   sectionHeader: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 8,
//   },
//   sellerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#fafafa',
//     borderRadius: 6,
//     padding: 12,
//     marginBottom: 8,
//     alignItems: 'center',
//   },
//   sellerName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },
//   sellerPrice: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1f2937',
//   },
// });


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const SPACING = 20;

interface Seller {
  position: number;
  name: string;
  link: string;
  base_price: string;
  total_price?: string;
}

const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).origin;
      return `${domain}/favicon.ico`;
    } catch {
      return null;
    }
};

export default function ProductDetailsScreen() {
  const { productId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (productId) {
      fetchDetails(productId as string);
    }
  }, [productId]);

  const fetchDetails = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:8081/api/productDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: id }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setDetails(data);
    } catch (err: any) {
      setError(err.message ?? 'Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  const handleSellerPress = (link: string) => {
    if (link) Linking.openURL(link);
  };

  if (!productId) {
    return <EmptyState message="No productId provided." />;
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <EmptyState message={error} isError />;
  }

  if (!details) {
    return <EmptyState message="No details found for this product." />;
  }

  const productInfo = details?.product_results || {};
  const sellers = details?.sellers_results?.online_sellers || [];
  const { title, rating, reviews, prices, description, media, highlights = [] } = productInfo;


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
              const slide = Math.ceil(
                nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
              );
              if (slide !== activeImageIndex) setActiveImageIndex(slide);
            }}
          >
            {Array.isArray(media) &&
              media
                .filter((m: any) => m.type === 'image')
                .map((img: any, idx: number) => (
                  <Image
                    key={idx}
                    source={{ uri: img.link }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                ))}
          </ScrollView>
          {/* Pagination Dots */}
          {Array.isArray(media) && media.length > 1 && (
            <View style={styles.pagination}>
              {media
                .filter((m: any) => m.type === 'image')
                .map((_, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.paginationDot,
                      idx === activeImageIndex && styles.paginationDotActive,
                    ]}
                  />
                ))}
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          {/* Title and Rating */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {rating?.toFixed(1)}</Text>
              <Text style={styles.reviews}>
                {reviews?.toLocaleString()} reviews
              </Text>
            </View>
          </View>

          {/* Price Range */}
          {Array.isArray(prices) && prices.length > 0 && (
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price Range</Text>
              <Text style={styles.priceRange}>
                {`${Math.min(...prices.map(p => parseFloat(p.replace(/[^0-9.-]+/g, ''))))} - ${
                  Math.max(...prices.map(p => parseFloat(p.replace(/[^0-9.-]+/g, ''))))
                }`}
              </Text>
            </View>
          )}

          {/* Highlights */}
          {highlights.length > 0 && (
            <View style={styles.highlightsContainer}>
              <Text style={styles.sectionTitle}>Highlights</Text>
              {highlights.map((highlight: string, idx: number) => (
                <View key={idx} style={styles.highlightItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Description */}
          {description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.sectionTitle}>About this item</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          )}

          {/* Sellers */}
          {/* <View style={styles.sellersContainer}>
            <Text style={styles.sectionTitle}>Where to Buy</Text>
            {sellers.map((seller: Seller, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.sellerCard}
                onPress={() => handleSellerPress(seller.link)}
              >
                <View style={styles.sellerInfo}>
                  <Text style={styles.sellerName}>{seller.name}</Text>
                  <Text style={styles.sellerTotal}>
                    {seller.total_price || seller.base_price}
                  </Text>
                </View>
                <LinearGradient
                  colors={['#007AFF', '#0055FF']}
                  style={styles.buyButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.buyButtonText}>Buy Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View> */}


          <View style={styles.sellersContainer}>
          <Text style={styles.sectionTitle}>Where to Buy</Text>
          {sellers.map((seller: Seller, index: number) => {
            const faviconUrl = getFaviconUrl(seller.direct_link || seller.link);
            
            return (
              <TouchableOpacity
                key={index}
                style={styles.sellerCard}
                onPress={() => handleSellerPress(seller.link)}
              >
                <View style={styles.sellerInfo}>
                  <View style={styles.sellerNameContainer}>
                    {faviconUrl && (
                      <Image
                        source={{ uri: faviconUrl }}
                        style={styles.favicon}
                        defaultSource={require('./assets/default-favicon.png')} // You'll need to add a default favicon
                      />
                    )}
                    <Text style={styles.sellerName}>{seller.name}</Text>
                  </View>
                  <Text style={styles.sellerTotal}>
                    {seller.total_price || seller.base_price}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const LoadingState = () => (
  <View style={styles.centerContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={styles.loadingText}>Loading details...</Text>
  </View>
);

const EmptyState = ({ message, isError }: { message: string; isError?: boolean }) => (
  <View style={styles.centerContainer}>
    <Text style={[styles.emptyStateText, isError && styles.errorText]}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    height: width * 0.8,
    backgroundColor: '#F8F9FA',
  },
  productImage: {
    width: width,
    height: width * 0.8,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#007AFF',
  },
  contentContainer: {
    padding: SPACING,
  },
  headerContainer: {
    marginBottom: SPACING,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFB800',
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    backgroundColor: '#F8F9FA',
    padding: SPACING,
    borderRadius: 12,
    marginBottom: SPACING,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  priceRange: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  highlightsContainer: {
    marginBottom: SPACING,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 8,
  },
  highlightText: {
    fontSize: 15,
    color: '#4A4A4A',
    flex: 1,
  },
  descriptionContainer: {
    marginBottom: SPACING,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#4A4A4A',
  },
  sellersContainer: {
    marginBottom: SPACING,
  },
  sellerCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: SPACING,
    marginBottom: 12,
  },
  sellerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 12,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  sellerTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  sellerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  favicon: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 4,
  },
  buyButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: SPACING,
  },
  errorText: {
    color: '#FF3B30',
  },
});