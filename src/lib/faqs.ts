import type { FAQ } from '../types';

const now = '2026-01-01T00:00:00.000Z';

function faq(id: number, category: string, question: string, answer: string, sortOrder: number): FAQ {
  return {
    id,
    category,
    question,
    answer,
    sortOrder,
    published: true,
    createdAt: now,
  };
}

/** Shown when the FAQ table is empty or the database cannot be reached. */
export const HOUSE_FAQS: FAQ[] = [
  faq(
    -1,
    'The Fragrance',
    'What size and concentration are the bottles?',
    'Every Dion Fragrance bottle is a 30 ml extrait de parfum. The price is GH₵350.',
    1
  ),
  faq(
    -2,
    'The Fragrance',
    'How should I wear it?',
    'Apply it to the pulse points: the wrists, the base of the neck, and behind the ears. Body heat helps the extrait open and last. Spray from about 30 cm away so the mist falls evenly.',
    2
  ),
  faq(
    -3,
    'The Fragrance',
    'How should I store the bottle?',
    'Keep the bottle in a cool, dry place, away from direct sunlight and sharp changes in temperature. That protects the character of the extrait.',
    3
  ),
  faq(
    -4,
    'Order Enquiries',
    'I have not received an update about my order.',
    'Check your junk or spam folder first. If the message is not there, message Dion Fragrance on WhatsApp or use the contact page with your order reference and we will resend the details.',
    4
  ),
  faq(
    -5,
    'Order Enquiries',
    'Can I cancel an order?',
    'If the bottle has not been dispatched, contact us and we will cancel it. If it has already left, it needs to come back unopened before a refund can be made.',
    5
  ),
  faq(
    -6,
    'Order Enquiries',
    'I was charged twice.',
    'Send us the payment proof and your order reference. If Paystack took the amount twice, the extra charge will be refunded.',
    6
  ),
  faq(
    -7,
    'Shipping issues',
    'How long does delivery take?',
    'Orders in major cities in Ghana are usually delivered in 1 to 3 working days. More distant addresses can take up to 5 working days. Tracking is sent by email or WhatsApp after dispatch.',
    7
  ),
  faq(
    -8,
    'Shipping issues',
    'My tracking says delivered, but I do not have the parcel.',
    'Check with anyone else at the address, including reception or neighbours. If it is still missing, contact us with the order reference and we will trace it with the courier.',
    8
  ),
  faq(
    -9,
    'Shipping issues',
    'I entered the wrong address.',
    'Contact us straight away. We can change the address before the order is dispatched. After it has shipped, we have to wait for the courier to return it before sending it again.',
    9
  ),
  faq(
    -10,
    'Returns & Product Care',
    'I received the wrong fragrance.',
    'Contact us within 48 hours and send a photo of what arrived, plus your order reference. We will arrange the correct bottle.',
    10
  ),
  faq(
    -11,
    'Returns & Product Care',
    'Are there any precautions?',
    'Do not spray on the eyes, irritated skin, or other sensitive areas. Keep the mist off pale or delicate fabric, because fragrance can mark it. If your skin is sensitive, try a small amount on the inner wrist first.',
    11
  ),
];
