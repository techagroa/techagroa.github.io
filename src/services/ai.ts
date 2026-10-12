import { Language } from '../types';

export interface AIResponse {
  text: string;
  citations?: string[];
  uncertainty?: string;
}

interface ContextInfo {
  district?: string;
  season?: string;
  language: Language;
}

// Reviewed agricultural knowledge citations
const CITATIONS = [
  'Department of Agriculture (DOA) Sri Lanka Crop Management Guidelines 2025/2026',
  'Rice Research and Development Institute (RRDI) - Bathalagoda Advisory Bulletin',
  'Horticultural Crop Research and Development Institute (HORDI) - Gannoruwa',
  'Ministry of Agriculture Circular on Plant Protection & Organic Inputs'
];

export async function askGoviyaAI(
  userQuery: string,
  context: ContextInfo
): Promise<AIResponse> {
  const query = userQuery.toLowerCase().trim();
  const lang = context.language;
  const district = context.district || 'Polonnaruwa';
  const season = context.season || 'Yala Season 2026';

  // Artificial short delay to emulate natural processing
  await new Promise(resolve => setTimeout(resolve, 800));

  // Domain knowledge matching for agricultural advisory
  if (query.includes('blast') || query.includes('leaf') || query.includes('පාළුව') || query.includes('நோய்')) {
    if (lang === 'si') {
      return {
        text: `වී කොළ පාළුව (Paddy Blast - Pyricularia oryzae) වැළැක්වීම සඳහා නිර්දේශ:\n1. අධික යුරියා භාවිතය වහාම නවත්වන්න.\n2. නිර්දේශිත දිලීර නාශකයක් (උදා. Tricyclazole 75% WP ග්‍රෑම් 5-8 ක් ජලය ලීටර් 10 කට) අලුයම හෝ සවස් කාලයේ ඉසින්න.\n3. ලියදි වල ජල මට්ටම අඟල් 2-3 ක මට්ටමක පවත්වා ගන්න.`,
        citations: [CITATIONS[1], CITATIONS[0]]
      };
    } else if (lang === 'ta') {
      return {
        text: `நெல் குலை நோய் (Paddy Blast) மேலாண்மை பரிந்துரைகள்:\n1. அதிகப்படியான யூரியா பயன்பாட்டை உடனே தவிர்க்கவும்.\n2. ட்ரைசைக்ளசோல் (Tricyclazole 75% WP) 10 லிட்டர் நீருக்கு 5-8 கிராம் கலந்து தெளிக்கவும்.\n3. வயலில் 2-3 அங்குல நீர் மட்டத்தை தொடர்ந்து பராமரிக்கவும்.`,
        citations: [CITATIONS[1], CITATIONS[0]]
      };
    } else {
      return {
        text: `For Paddy Blast (Pyricularia oryzae) management in ${district}:\n1. Immediately halt excess nitrogen/urea top-dressing.\n2. Apply recommended Tricyclazole 75% WP at 5–8g per 10L water during cool hours.\n3. Maintain standing water at 2–3 inches to reduce spore germination. Always rotate fungicides to prevent resistance.`,
        citations: [CITATIONS[1], CITATIONS[0]]
      };
    }
  }

  if (query.includes('urea') || query.includes('fertilizer') || query.includes('පොහොර') || query.includes('உர')) {
    if (lang === 'si') {
      return {
        text: `දෙපාර්තමේන්තු පොහොර කාලසටහන (${season}):\n• මූලික පොහොර: බිම් සැකසීමේ අවසන් අදියරේදී යොදන්න.\n• 1 වන යුරියා යෙදීම: බීජ වැපිරීමෙන් දින 14–21 දී.\n• 2 වන යුරියා යෙදීම: කරල් හටගන්නා අවස්ථාවේදී (දින 40-45).\nසටහන: සහනාධාර පොහොර ලබාගැනීමට ඔබේ ගොවිජන සේවා මධ්‍යස්ථානයේ ගොවි ලියාපදිංචිය තහවුරු කරන්න.`,
        citations: [CITATIONS[0], CITATIONS[3]]
      };
    } else if (lang === 'ta') {
      return {
        text: `விவசாய திணைக்களத்தின் உர அட்டவணை (${season}):\n• ஆரம்ப உரம்: விதைப்பதற்கு 24 மணி நேரத்திற்கு முன் இடுக.\n• 1வது யூரியா: விதைத்த 14-21 நாட்களில்.\n• 2வது யூரியா: பூக்கும் ஆரம்ப கட்டத்தில் (40-45 நாட்களில்).\nமானிய உரங்களுக்கு உங்கள் கமநல சேவை மையத்தில் பதிவை சரிபார்க்கவும்.`,
        citations: [CITATIONS[0], CITATIONS[3]]
      };
    } else {
      return {
        text: `Department of Agriculture Fertilizer Schedule for ${season} in ${district}:\n• Basal Mixture: Apply 24h before broadcasting.\n• Top Dressing 1 (Urea): 14–21 days after sowing (35 kg/ha).\n• Top Dressing 2 (Urea & MOP): Panicle initiation stage at 42–45 days.\nEnsure the subsidized voucher is claimed at your local Agrarian Service Center before stock quota deadlines.`,
        citations: [CITATIONS[0], CITATIONS[3]]
      };
    }
  }

  if (query.includes('tomato') || query.includes('තක්කාලි') || query.includes('தக்காளி')) {
    return {
      text: lang === 'si'
        ? `තක්කාලි වගාව සඳහා උපදෙස්:\n• කීල්ස් හයිබ්‍රිඩ් හෝ පද්ම ප්‍රභේද වියළි සහ අතරමැදි කලාප වලට වඩාත් සුදුසුය.\n• සුදු මැස්සන්ගෙන් හානිකර කොළ කොඩවීම වැළැක්වීමට කහ පැහැති ඇලෙන සුළු උගුල් (Yellow sticky traps) භාවිතා කරන්න.\n• බිංදු ජල සම්පාදනය මගින් කොළ තෙත්වීම වළක්වා දිලීර රෝග පාලනය කරන්න.`
        : `Tomato Advisory for ${district}:\n• Recommended varieties: Keells Hybrid, Padma, or Lanka Sour.\n• To prevent Whitefly vectors causing Leaf Curl Virus, install yellow sticky traps (10 per acre).\n• Prefer drip irrigation to keep foliage dry and suppress bacterial wilt and early blight.`,
      citations: [CITATIONS[2]]
    };
  }

  // Default fallback with helpful agricultural clarification
  if (lang === 'si') {
    return {
      text: `ඔබගේ ප්‍රශ්නය: "${userQuery}". ${district} දිස්ත්‍රික්කයේ ${season} සඳහා කෘෂිකාර්මික උපදෙස් අවශ්‍ය නම්, කරුණාකර ඔබ වගා කරන බෝගය (වී, එළවළු, පළතුරු), බෝගයේ වයස සහ ඇතිවී තිබෙන රෝග ලක්ෂණ සඳහන් කරන්න.`,
      uncertainty: 'නියමිත බෝගය හෝ ගැටලුව හඳුනා ගැනීමට වැඩි විස්තර අවශ්‍යයි.'
    };
  } else if (lang === 'ta') {
    return {
      text: `உங்கள் கேள்வி: "${userQuery}". ${district} மாவட்டத்தில் ${season} பயிர்செய்கைக்கான ஆலோசனைகளுக்கு, பயிர் வகை (நெல், மரக்கறி), பயிரின் வயது மற்றும் நோய் அறிகுறிகளை தெளிவுபடுத்தவும்.`,
      uncertainty: 'சரியான வழிகாட்டலுக்கு மேலதிக விபரங்கள் தேவை.'
    };
  } else {
    return {
      text: `Regarding "${userQuery}" for ${district} during ${season}:\nI can assist with certified seed varieties (e.g. BG 352/358), Department of Agriculture pest treatments, fertilizer split dosages, or irrigation timing. Could you please specify the exact crop, growth stage (days since sowing), and any specific symptoms observed?`,
      uncertainty: 'Additional crop details needed for precise recommendation.'
    };
  }
}
