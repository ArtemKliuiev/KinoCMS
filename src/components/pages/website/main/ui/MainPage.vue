<script lang="ts" setup>
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/components/mixins";
import { onMounted, ref } from 'vue';
import { MainSlider } from "@/components/reusable";

const topBannersData = ref(false)
const topBanners = ref([])
const bottomBannersData = ref(false)
const bottomBanners = ref([])

onMounted(() => {
  getBannersData()
})


async function getBannersData(){
  const collectionRef = collection(db, "data");
  const querySnapshot = await getDocs(collectionRef);

  const allData = {};
  querySnapshot.forEach((doc) => {
    allData[doc.id] = doc.data();
  });

  topBannersData.value = allData.dataBanners.top
  topBanners.value = allData.banners.top
  bottomBannersData.value = allData.dataBanners.bottom
  bottomBanners.value = allData.banners.bottom
}


</script>

<template>
  <MainSlider :banners="topBanners" :data="topBannersData" position="top"/>

  <div class="text">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, incidunt soluta tempora enim repellat,
    aspernatur iure commodi impedit veritatis provident dolor, perspiciatis nemo qui. Esse provident ut sint eius maxime
    veritatis voluptatum odio. Unde rem omnis voluptate aperiam dicta, voluptatem corporis repellat facilis voluptas
    tempore repellendus perferendis placeat laudantium! Illo explicabo, illum accusamus nam, tempore fuga nostrum facere
    quae dolorum harum dignissimos placeat debitis? Ut dolorum ab necessitatibus quo cumque aut architecto assumenda
    laboriosam consequatur maxime doloribus ex, illo voluptatibus commodi quidem, repellendus libero iusto beatae, magni
    illum totam! Doloribus, corporis dolore! Culpa, veritatis quidem fuga similique pariatur praesentium dolorem
    repudiandae architecto inventore ullam? Minima sint dolores nisi ullam voluptates. Veniam quas numquam nisi tempora id
    minus dignissimos temporibus deleniti sint consequatur. Error, dolore ullam alias culpa et ut quae harum, officia
    corrupti laboriosam numquam enim sint, perspiciatis incidunt laborum nihil? Deleniti quaerat excepturi doloribus quas.
    Laudantium, inventore! Ducimus maiores reiciendis autem necessitatibus doloremque libero cumque corrupti, iusto
    adipisci accusamus quis ex sequi minima veritatis at. Voluptatem, adipisci fugiat assumenda, id quisquam ducimus in
    modi iste non inventore quasi velit quae. Sapiente, labore natus. Excepturi delectus totam ab eaque ex, sit aliquid
    eius, harum, incidunt aliquam laborum fugiat sed unde dicta quaerat blanditiis saepe necessitatibus? Sapiente aliquid,
    ducimus repudiandae dignissimos laboriosam accusantium magni eligendi obcaecati quia, aspernatur ratione error nobis
    unde ab? Minus, iste cumque quaerat dolor expedita sint maiores vero cum veniam tempora facere quibusdam voluptatem
    nihil sequi nostrum molestiae illum blanditiis praesentium magni voluptatibus quis maxime velit error delectus?
    Laborum, harum iste expedita odio sequi eius dicta exercitationem eaque error corporis. Tempora voluptates voluptatum
    sit, voluptas corrupti consequuntur perspiciatis incidunt veritatis ipsa facere soluta tempore repellendus? Sapiente
    natus, sint nemo quasi, sed ipsa repellat consequatur beatae quam omnis inventore deserunt? Possimus rerum consequatur
    ullam esse sunt a animi expedita quas vitae autem hic ea placeat quibusdam exercitationem voluptatem accusantium quam
    reprehenderit, numquam veritatis voluptates perspiciatis tempore eligendi deleniti reiciendis. Rem praesentium
    eligendi quibusdam aliquid perspiciatis? Optio a in at eligendi labore, modi exercitationem quasi pariatur non
    suscipit quod, vero deleniti ea architecto iusto, odit asperiores nesciunt. Maiores placeat dolores nostrum sed illum
    asperiores alias temporibus minus! Atque doloribus corporis expedita blanditiis, explicabo consequatur neque ullam ex
    accusantium ratione veritatis? Perferendis nulla tempore libero beatae, vero alias illo, enim fugiat error quos
    corporis ex, sit esse dolor maxime ut dignissimos quas! Illum qui dolor veniam dignissimos quis suscipit aspernatur
    nisi iusto fugiat. Voluptas, iste sed odit magni dolore tenetur dolor commodi? Ea libero laboriosam voluptatum
    explicabo rem eligendi, assumenda mollitia enim eius accusamus quo, iste doloribus amet harum culpa pariatur ipsa
    perferendis iure vitae tempore ut. Amet cupiditate minima ex! Tempora nesciunt recusandae corporis repudiandae
    possimus enim. Rerum atque deserunt dignissimos, enim ipsa aut sunt reiciendis nemo quibusdam iure placeat laboriosam,
    at corrupti soluta odio doloribus asperiores perferendis nesciunt. Quaerat corporis dolorem dolorum necessitatibus,
    soluta mollitia tenetur velit facilis odio magni iure molestias voluptatum. Expedita ullam, consequatur beatae alias
    qui amet! Dolorum ipsa reprehenderit quod commodi. Ullam sunt enim earum necessitatibus eligendi quos deleniti dicta,
    quaerat incidunt consectetur quasi facere delectus ratione sequi hic alias nesciunt, excepturi, odit ipsa. Nesciunt
    distinctio iste, sint aperiam ab asperiores temporibus cupiditate fuga obcaecati odit ullam ipsam sit porro atque modi
    accusantium consectetur vitae aspernatur magnam aliquam vel. Voluptates animi veniam nostrum vitae excepturi deleniti
    itaque sed doloremque pariatur fuga aut cumque voluptatem totam fugit iste esse, quo velit minus eos delectus maxime
    ea necessitatibus consequatur praesentium? Asperiores quis dolorum repellendus excepturi maxime consequuntur provident
    sapiente fuga qui, quidem tempore tenetur quasi rem error earum sed suscipit ex unde nulla dolore sit officia
    obcaecati nisi. A provident sequi molestias ea excepturi ratione nulla, cupiditate architecto animi eius quibusdam
    explicabo possimus! Sapiente illo laudantium quos harum magnam dolores, accusantium itaque sunt. Temporibus neque
    aperiam perspiciatis corporis sint? Velit dolorum aperiam, praesentium assumenda enim delectus optio distinctio
    ducimus aspernatur soluta officia, ipsa voluptatem sit. Consequatur sed vitae nisi quaerat praesentium provident
    numquam aut magni beatae perferendis? Obcaecati cum cumque, perferendis laboriosam rem dolorum repudiandae repellendus
    quibusdam deserunt aperiam eum in iure culpa iusto earum totam aspernatur error atque, nobis cupiditate odit molestiae
    velit, saepe odio. Voluptates, ea dignissimos tempora, id vitae dolor, quia labore dolore odio facilis culpa saepe
    maxime iure obcaecati temporibus ipsa tenetur veniam. Deserunt eum fuga cumque placeat ipsam fugit corporis tenetur
    minus, tempore labore, similique sint corrupti odit ratione iusto voluptates vitae nemo at dignissimos enim ea
    molestiae quod blanditiis unde? Facilis ut sed vero repudiandae voluptates neque mollitia ullam officiis eum, saepe
    repellendus aut ducimus quos reprehenderit accusamus placeat animi ratione esse magni. Illo quam cumque sequi
    molestias deleniti ab, officia consequatur molestiae nostrum temporibus repellendus sunt, odio, non aut adipisci
    quibusdam odit atque consectetur excepturi! Explicabo dicta neque fugiat nesciunt reiciendis, distinctio odit
    laudantium aperiam optio natus consequatur, ipsum, aspernatur voluptate officia? Omnis expedita incidunt possimus
    alias! Suscipit quod doloremque minus cum. Debitis quaerat quisquam eum, perferendis unde praesentium, maiores nisi
    eveniet nihil cumque quam aliquid dicta blanditiis laudantium? Voluptatibus ea explicabo repudiandae eveniet
    praesentium distinctio laboriosam veritatis, sint ipsa iure doloribus excepturi id, ad quidem. Amet impedit harum non
    eius magni! Labore ex eaque quo repudiandae at, assumenda qui dolores sapiente quisquam ducimus. Ab totam et dolores
    consequuntur? Dolor ea magnam, assumenda molestias est fugit tempore. Ea accusantium eius facere ipsa modi consectetur
    vero labore? Neque, sunt repellat aspernatur nobis autem in aut vero doloremque sapiente? Beatae tenetur harum
    expedita temporibus ab perferendis mollitia delectus sint reiciendis placeat, eligendi nostrum, voluptates autem error
    sit eum velit id. Accusamus sit, explicabo illo molestias velit rerum maiores assumenda nulla aliquid iste quisquam,
    architecto cupiditate provident! Optio dolor at, voluptatum neque dolorem libero qui quisquam esse deserunt veritatis
    nemo commodi maxime quasi molestias repellat asperiores aspernatur? Repudiandae dolores accusamus quisquam
    perferendis. Et, magni. Praesentium similique ullam recusandae architecto, laudantium, ab commodi rerum, quibusdam
    modi ad alias inventore possimus eius sit optio ipsa voluptatum sapiente totam natus? Tempore placeat quae libero
    provident corrupti voluptas est. Repudiandae, harum quod eius incidunt vitae ut quibusdam numquam facere iusto sunt
    soluta fugiat, magnam reiciendis aperiam dignissimos repellendus? Quisquam odit nulla optio adipisci aut illum
    consequatur quis voluptates exercitationem ullam veritatis consectetur doloribus fugiat ducimus, ea vitae distinctio
    amet! Libero cum a id nobis mollitia quam nesciunt itaque. Ut, sit? Assumenda eum cumque a magni voluptates? Deleniti
    labore distinctio beatae eos nihil excepturi, eligendi nostrum dolorum tempora laudantium, veniam incidunt doloribus.
    Sapiente possimus fugiat nihil ipsum numquam dolorem, architecto sit quia voluptates vel eveniet tempora eos maiores
    iste voluptatibus incidunt eaque velit suscipit rerum, iure non voluptatum at illo perspiciatis? Laboriosam
    consectetur excepturi exercitationem consequatur facere aspernatur animi nostrum? Accusantium, ad vitae inventore
    alias officiis sint ut consequuntur amet rem ratione in similique aliquid atque illo perspiciatis! Impedit, minima,
    maiores sint cum blanditiis accusantium magnam saepe pariatur voluptates qui possimus nisi tenetur! Ab enim dolorum
    vitae porro officiis ducimus perferendis cum expedita, necessitatibus harum, architecto pariatur veritatis explicabo
    eum laudantium error exercitationem eos molestias qui omnis consequatur quasi? Expedita dicta culpa at dolorum earum
    ducimus eius aut, inventore nisi eum libero vitae blanditiis similique numquam repellat aperiam mollitia qui, ratione
    accusamus sunt! Modi perferendis aperiam sequi ipsum! Dolorum neque, voluptatibus mollitia iste excepturi accusantium
    porro deserunt quos harum vero praesentium hic distinctio voluptates ipsam impedit animi quas ea eaque nobis
    consequuntur corrupti earum velit, iusto aperiam? Officia laudantium fugiat culpa veniam. Cumque ad laboriosam optio
    praesentium voluptatem accusantium sequi iste nulla aperiam dolorem. Magnam, tenetur? Repudiandae sint officia
  </div>

  <MainSlider :banners="bottomBanners" :data="bottomBannersData" position="bottom"/>


</template>

<style lang="scss" scoped>
@import './MainPage.scss';
</style>