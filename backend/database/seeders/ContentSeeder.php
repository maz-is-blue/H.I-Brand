<?php

namespace Database\Seeders;

use App\Models\ContentItem;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    /**
     * Seeds today's hardcoded copy as defaults. Uses firstOrCreate (not
     * updateOrCreate) so re-running this on a redeploy never overwrites
     * content an admin has already edited in the dashboard.
     */
    public function run(): void
    {
        foreach ($this->items() as $key => $item) {
            ContentItem::firstOrCreate(['key' => $key], $item);
        }
    }

    private function items(): array
    {
        $text = fn ($label, $en, $ar) => ['label' => $label, 'type' => 'text', 'value_en' => $en, 'value_ar' => $ar];
        $setting = fn ($label, $value) => ['label' => $label, 'type' => 'setting', 'value_en' => $value, 'value_ar' => $value];
        $image = fn ($label) => ['label' => $label, 'type' => 'image'];

        return [
            // ---- Settings (single source of truth for links/numbers) ----
            'settings.whatsapp_number'  => $setting('Settings — WhatsApp number', '963000000000'),
            'settings.instagram_url'    => $setting('Settings — Instagram URL', 'https://instagram.com/h.i.brands'),
            'settings.instagram_handle' => $setting('Settings — Instagram handle', '@h.i.brands'),
            'settings.threads_url'      => $setting('Settings — Threads URL', 'https://threads.net/@h.i.brands'),

            // ---- Nav ----
            'nav.home'        => $text('Nav — Home', 'Home', 'الرئيسية'),
            'nav.collections' => $text('Nav — Collections', 'Collections', 'التشكيلات'),
            'nav.about'       => $text('Nav — About', 'About', 'من نحن'),
            'nav.contact'     => $text('Nav — Contact', 'Contact', 'تواصل'),

            // ---- Footer ----
            'footer.tagline'    => $text('Footer — Tagline', 'Your outfit is your identity.. Choose right', 'ملابسك هويتك.. اختر بشكل صحيح'),
            'footer.location'   => $text('Footer — Location', 'Damascus · Syria', 'دمشق · سوريا'),
            'footer.rights'     => $text('Footer — Rights line', '© 2026 H.I. Brands. All rights reserved.', '© 2026 H.I. Brands. جميع الحقوق محفوظة.'),
            'footer.admin_link' => $text('Footer — Admin link label', 'Admin', 'لوحة التحكم'),

            // ---- Home ----
            'home.eyebrow_location'  => $text('Home — Eyebrow: location', 'Damascus · Syria', 'دمشق · سوريا'),
            'home.eyebrow_category'  => $text('Home — Eyebrow: category', 'Menswear', 'أزياء رجالية'),
            'home.hero_line1'        => $text('Home — Hero line 1', 'Your outfit is your identity..', 'ملابسك هويتك..'),
            'home.hero_line2'        => $text('Home — Hero line 2 (gold)', 'Choose right', 'اختر بشكل صحيح'),
            'home.hero_shop_btn'     => $text('Home — Hero "Shop" button', 'Shop Now', 'تسوّق الآن'),
            'home.hero_house_btn'    => $text('Home — Hero "The House" button', 'The House', 'قصة الدار'),
            'home.manifesto_kick'    => $text('Home — Manifesto label', 'Manifesto', 'البيان'),
            'home.manifesto_p1'      => $text('Home — Manifesto text before gold phrase', 'We choose the ', 'نختار '),
            'home.manifesto_gold'    => $text('Home — Manifesto gold phrase', 'piece that speaks', 'القطعة التي تتحدّث'),
            'home.manifesto_p2'      => $text('Home — Manifesto text after gold phrase', ' before you do. Authentic labels, handpicked, delivered to every governorate in Syria.', ' قبل أن تنطق. ماركات أصلية، منتقاة بعناية، تصل إلى كل محافظة سورية.'),
            'home.selection_kick'    => $text('Home — Selection label', 'The Selection', 'المختارات'),
            'home.selection_title'   => $text('Home — Selection title', 'Featured Pieces', 'قطع مميزة'),
            'home.selection_view_all'=> $text('Home — "View all" link', 'View the full collection', 'شاهد التشكيلة كاملة'),
            'home.about_kick'        => $text('Home — About-teaser label', 'The House', 'الدار'),
            'home.about_title'       => $text('Home — About-teaser title', 'From the heart of Damascus to all of Syria', 'من قلب دمشق لكل المحافظات السورية'),
            'home.about_body'        => $text('Home — About-teaser body', "From a small storefront to a destination for the man who knows what he wants — we bring the world's sharpest labels to your door.", 'من دكان صغير إلى وجهة للرجل الذي يعرف ما يريد. نجلب أرقى الماركات إلى عتبة بابك.'),
            'home.about_read_more'   => $text('Home — About-teaser "Read more"', 'Read our story', 'اقرأ قصتنا'),
            'home.instagram_kick'    => $text('Home — Instagram label', 'On the feed', 'على إنستغرام'),
            'home.instagram_follow'  => $text('Home — Instagram "Follow" link', 'Follow @h.i.brands', 'تابعنا @h.i.brands'),
            'home.cta_title'         => $text('Home — Bottom CTA title', 'Reach out and order now', 'تواصل معنا واطلب الآن'),
            'home.cta_sub'           => $text('Home — Bottom CTA subtext', "Message us on WhatsApp — we'll style the order with you.", 'راسلنا على واتساب وسنرتّب طلبك خطوة بخطوة.'),
            'home.cta_btn'           => $text('Home — Bottom CTA button', 'Chat on WhatsApp', 'تحدّث عبر واتساب'),
            'home.instagram_tile_1'  => $image('Home — Instagram tile 1'),
            'home.instagram_tile_2'  => $image('Home — Instagram tile 2'),
            'home.instagram_tile_3'  => $image('Home — Instagram tile 3'),
            'home.instagram_tile_4'  => $image('Home — Instagram tile 4'),
            'home.instagram_tile_5'  => $image('Home — Instagram tile 5'),
            'home.instagram_tile_6'  => $image('Home — Instagram tile 6'),

            // ---- About ----
            'about.kick'        => $text('About — Label', 'The House', 'الدار'),
            'about.title'       => $text('About — Title line 1', 'From the heart of Damascus', 'من قلب دمشق'),
            'about.title2'      => $text('About — Title line 2 (gold)', 'to all of Syria', 'لكل المحافظات السورية'),
            'about.p1'          => $text('About — Story paragraph 1', 'H.I. Brands began with a simple conviction: that the Syrian man deserves to wear the best — without having to travel to find it. From a small storefront in Damascus, we became a destination for those who understand that style is a language spoken before a word.', 'بدأت H.I. Brands من قناعة بسيطة: أن الرجل السوري يستحق أن يرتدي الأفضل، دون أن يضطر للسفر بحثاً عنه. من واجهة صغيرة في دمشق، صرنا وجهة لمن يعرف أن الأناقة لغة تُقال قبل الكلام.'),
            'about.p2'          => $text('About — Story paragraph 2', "We don't simply sell clothing — we curate. Every piece passes through our hands before it reaches yours, delivered to your door in every governorate. Authentic labels, personal service, and an unshakeable local pride.", 'نحن لا نبيع ملابس فحسب — نختار. كل قطعة تمرّ بأيدينا قبل أن تصل إليك، ونوصلها إلى باب منزلك في كل محافظة. ماركات أصلية، خدمة شخصية، وفخر محلي لا يتزعزع.'),
            'about.quote'       => $text('About — Pull quote', 'Your outfit is your identity.. Choose right.', 'ملابسك هويتك.. اختر بشكل صحيح.'),
            'about.values_kick' => $text('About — Values label', 'What we believe', 'ما نؤمن به'),
            'about.values.0.n'  => $text('About — Value 1 number', '01', '01'),
            'about.values.0.t'  => $text('About — Value 1 title', 'Guaranteed authenticity', 'أصالة مضمونة'),
            'about.values.0.d'  => $text('About — Value 1 description', 'Original international labels only — no imitations, no half measures.', 'ماركات عالمية أصلية فقط — لا تقليد، لا أنصاف حلول.'),
            'about.values.1.n'  => $text('About — Value 2 number', '02', '02'),
            'about.values.1.t'  => $text('About — Value 2 title', 'All of Syria', 'نصل لكل سوريا'),
            'about.values.1.d'  => $text('About — Value 2 description', 'Delivery to every governorate, with door-to-door boutique service.', 'توصيل إلى كل المحافظات، بخدمة بوتيك من الباب إلى الباب.'),
            'about.values.2.n'  => $text('About — Value 3 number', '03', '03'),
            'about.values.2.t'  => $text('About — Value 3 title', 'Personal styling', 'تنسيق شخصي'),
            'about.values.2.d'  => $text('About — Value 3 description', 'We help you choose the look that suits you and the occasion.', 'نساعدك في اختيار الإطلالة المناسبة لك ولمناسبتك.'),
            'about.values.3.n'  => $text('About — Value 4 number', '04', '04'),
            'about.values.3.t'  => $text('About — Value 4 title', 'Damascene pride', 'فخر دمشقي'),
            'about.values.3.d'  => $text('About — Value 4 description', "From the heart of the world's oldest inhabited capital, to your wardrobe.", 'من قلب أقدم عاصمة مأهولة في العالم، إلى خزانتك.'),
            'about.stats_kick'  => $text('About — Stats label', 'By the numbers', 'بالأرقام'),
            'about.stats.0.v'   => $text('About — Stat 1 value', '14', '14'),
            'about.stats.0.l'   => $text('About — Stat 1 label', 'governorates served', 'محافظة نخدمها'),
            'about.stats.1.v'   => $text('About — Stat 2 value', '20+', '+20'),
            'about.stats.1.l'   => $text('About — Stat 2 label', 'global labels', 'ماركة عالمية'),
            'about.stats.2.v'   => $text('About — Stat 3 value', '2026', '2026'),
            'about.stats.2.l'   => $text('About — Stat 3 label', 'established', 'منذ'),
            'about.cta_title'   => $text('About — CTA title', 'Discover the collection', 'اكتشف التشكيلة'),
            'about.cta_btn'     => $text('About — CTA browse button', 'Browse the collection', 'تصفّح التشكيلة'),
            'about.cta_contact' => $text('About — CTA contact button', 'Get in touch', 'تواصل معنا'),

            // ---- Contact ----
            'contact.kick'            => $text('Contact — Label', 'Contact', 'تواصل'),
            'contact.title'           => $text('Contact — Title', "Let's talk", 'لنتحدّث'),
            'contact.lead'            => $text('Contact — Lead paragraph', "A question about a piece, a special request, or just hello — we're one message away.", 'سؤال عن قطعة، طلب خاص، أو مجرد سلام — نحن على بُعد رسالة.'),
            'contact.channels_kick'   => $text('Contact — Channels label', 'Channels', 'قنوات التواصل'),
            'contact.whatsapp_title'  => $text('Contact — WhatsApp title', 'WhatsApp', 'واتساب'),
            'contact.whatsapp_desc'   => $text('Contact — WhatsApp description', 'The fastest way to order & ask', 'أسرع طريقة للطلب والاستفسار'),
            'contact.whatsapp_btn'    => $text('Contact — WhatsApp button', 'Open WhatsApp', 'افتح واتساب'),
            'contact.instagram_title' => $text('Contact — Instagram title', 'Instagram', 'إنستغرام'),
            'contact.instagram_desc'  => $text('Contact — Instagram description', 'Follow the latest pieces', 'تابع أحدث القطع'),
            'contact.threads_title'   => $text('Contact — Threads title', 'Threads', 'ثريدز'),
            'contact.threads_desc'    => $text('Contact — Threads description', '@h.i.brands', '@h.i.brands'),
            'contact.location_title'  => $text('Contact — Location title', 'Location', 'الموقع'),
            'contact.location_desc'   => $text('Contact — Location description', 'Damascus · Syria', 'دمشق · سوريا'),
            'contact.hours_title'     => $text('Contact — Hours title', 'Hours', 'ساعات العمل'),
            'contact.hours_desc'      => $text('Contact — Hours description', 'Sat – Thu · 11am – 9pm', 'السبت – الخميس · 11ص – 9م'),
            'contact.form_kick'       => $text('Contact — Form label', 'Send a message', 'أرسل رسالة'),
            'contact.field_name'      => $text('Contact — Field: name', 'Name', 'الاسم'),
            'contact.field_phone'     => $text('Contact — Field: phone', 'Phone (optional)', 'الهاتف (اختياري)'),
            'contact.field_message'   => $text('Contact — Field: message', 'Your message', 'رسالتك'),
            'contact.send_btn'        => $text('Contact — Send button', 'Send via WhatsApp', 'أرسل عبر واتساب'),
            'contact.sent_message'    => $text('Contact — Sent confirmation', 'WhatsApp opened — finish sending there.', 'تم فتح واتساب — أكمل الإرسال هناك.'),
            'contact.error_name'      => $text('Contact — Error: name required', 'Please enter your name', 'الرجاء إدخال الاسم'),
            'contact.error_message'   => $text('Contact — Error: message required', 'Please write your message', 'الرجاء كتابة رسالتك'),
            'contact.map_label'       => $text('Contact — Map placeholder label', 'Damascus, Syria', 'دمشق، سوريا'),
            'contact.map_image'       => $image('Contact — Map image'),

            // ---- Collections ----
            'collections.kick'                  => $text('Collections — Label', 'The Collection · 2026', 'التشكيلة · 2026'),
            'collections.title'                 => $text('Collections — Title', 'The Collection', 'التشكيلة'),
            'collections.lead'                  => $text('Collections — Lead paragraph', "Curated pieces from the world's sharpest labels — for every occasion, for every man.", 'قطع منتقاة من أرقى الماركات العالمية — لكل مناسبة، ولكل رجل.'),
            'collections.look_kick'              => $text('Collections — Lookbook label', 'Lookbook', 'لوك بوك'),
            'collections.look_title'             => $text('Collections — Lookbook title', 'Effortless, uncompromising', 'أناقة بلا مجاملة'),
            'collections.look_body'              => $text('Collections — Lookbook body', 'From the overcoat that opens winter to the shirt that makes your day.', 'من المعطف الذي يفتتح الشتاء إلى القميص الذي يصنع يومك.'),
            'collections.lookbook_image_label'   => $text('Collections — Lookbook large image label', 'lookbook image — large', 'صورة لوك بوك — كبيرة'),
            'collections.lookbook_detail_label'  => $text('Collections — Lookbook detail image label', 'detail', 'تفصيلة'),
            'collections.lookbook_image'         => $image('Collections — Lookbook large image'),
            'collections.lookbook_detail_image'  => $image('Collections — Lookbook detail image'),
            'collections.count_one'              => $text('Collections — Item count (singular)', '{n} piece', '{n} قطعة'),
            'collections.count_other'            => $text('Collections — Item count (plural)', '{n} pieces', '{n} قطعة'),
            'collections.empty'                  => $text('Collections — Empty category message', 'No pieces in this category yet.', 'لا توجد قطع في هذه الفئة بعد.'),
            'collections.order_whatsapp_btn'      => $text('Collections — "Order via WhatsApp" button', 'Order via WhatsApp', 'اطلب عبر واتساب'),
            'collections.category.All'           => $text('Collections — Category: All', 'All', 'الكل'),
            'collections.category.T-Shirts'      => $text('Collections — Category: T-Shirts', 'T-Shirts', 'تيشيرتات'),
            'collections.category.Knitwear'      => $text('Collections — Category: Knitwear', 'Knitwear', 'تريكو'),
            'collections.category.Trousers'      => $text('Collections — Category: Trousers', 'Trousers', 'بناطيل'),
            'collections.category.Pajamas'       => $text('Collections — Category: Pajamas', 'Pajamas', 'بجامات'),
            'collections.category.Pajama-Pants'  => $text('Collections — Category: Pajama Pants', 'Pajama Pants', 'بنطال بجامة مفرد'),
            'collections.category.Shirt'         => $text('Collections — Category: Shirt', 'Shirt', 'قميص'),
        ];
    }
}
