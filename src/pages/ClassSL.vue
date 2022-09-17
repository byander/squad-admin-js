<template>
  <q-page padding>
    <h6 class="doc-heading doc-h2">Líder de esquadrão</h6>
    <div class="text-body2 text-justify">
      <p>
        O líder de esquadrão é um dos papéis mais difíceis, pois requer profundo
        conhecimento do jogo, juntamente com fortes habilidades de liderança,
        organização e comunicação.
      </p>
      <p>
        O líder do esquadrão usa rally point para manter seu esquadrão no jogo,
        comunicações para coordenar suprimentos, munições, ataques e defesas com
        outros líderes de esquadrão, e marcadores de mapa para retransmitir as
        posições inimigas para o resto da equipe. Ele coloca FOBs e HABs para
        estabelecer uma presença para sua equipe no campo de batalha. A eficácia
        com que o líder do esquadrão desempenha essas funções afeta a diversão
        do jogo para os membros do esquadrão e o resto de sua equipe.
      </p>
    </div>

    <div>
      <p class="doc-heading text-subtitle1" v-on:click="goto('tips')">
        >> Dicas
      </p>
      <p class="doc-heading text-subtitle1" v-on:click="goto('rally')">
        >> Rally Point
      </p>
      <p class="doc-heading text-subtitle1" v-on:click="goto('fob')">
        >> FOB (rádio) e HABs
      </p>
      <p class="doc-heading text-subtitle1" v-on:click="goto('stra')">
        >> Estratégias
      </p>
    </div>

    <h6 class="doc-heading doc-h2" ref="tips">Dicas</h6>
    <div class="text-body2 text-justify">
      <lu>
        <li>
          Como líder de esquadrão, você DEVE ter o kit de líder de esquadrão
          (SL) para desempenhar sua função, pois outras funções não lhe darão
          acesso aos vários comandos necessários.
        </li>
        <li>
          Quando você começar a liderar o esquadrão, informe os membros do seu
          esquadrão e aos outros líderes sobre sua inexperiência. Eles serão
          mais tolerantes com seus erros e estarão prontos para fornecer
          conselhos úteis.
        </li>
        <li>
          Lidere com determinação, mantenha a calma, mesmo em situações
          complicadas. As pessoas vão querer saber o que fazer se você fizer
          isso com confiança. Os membros do esquadrão irão naturalmente se
          afastar se não tiverem liderança.
        </li>
        <li>Tenha um microfone para a comunicação.</li>
        <li>
          Comunique-se frequentemente com seu esquadrão em todas as situações e
          com outros líderes.
        </li>
        <li>
          Certifique-se de que seu esquadrão está seguindo suas ordens e
          executando-as.
        </li>
        <li>Jogue os objetivos.</li>
        <li>
          Seja decisivo, mas também flexível e aberto a aceitar conselhos de
          seus companheiros de esquadrão.
        </li>
        <li>
          Tenha uma variedade de funções no esquadrão para estar pronto para
          qualquer situação.
        </li>
      </lu>
    </div>
    <h6 class="doc-heading doc-h2">Rally Point</h6>
    <div class="text-body2 text-justify" ref="rally">
      <lu>
        <li>Use e abuse do rally point. Ele te ajudará em várias situações.</li>
        <li>
          Regras para colocar o rally point: se você estiver com a classe Squad
          Leader será necessário 1 (um) membro do seu esquadrão próximo; se você
          estiver com a classe Leader Crewman será necessário 3 (três) membros
          do seu esquadrão próximos.
        </li>
        <li>
          Se tiver inimigo próximo, o rally point não será colocado e aparecerá
          uma mensagem de aviso informando que uma nova tentativa será em 100
          segundos.
        </li>
        <li>
          Coloque o rally point em algum lugar estratégico. Ele servirá para o
          seu esquadrão dar respawn em caso da HAB estiver bloqueada ou como
          alerta se o mesmo sumir, indicando que há inimigo próximo.
        </li>
        <li>
          Sempre coloque um rally point antes de executar um ataque para que seu
          esquadrão possa voltar à luta depois de morrer.
        </li>
      </lu>
    </div>
    <h6 class="doc-heading doc-h2">FOB (rádio) e HABs</h6>
    <div class="text-body2 text-justify" ref="fob">
      <lu>
        <li>
          A FOB ou rádio serve para colocar a HAB (local para dar respawn) bem
          como estação de reparo, construções e armamentos como morteiros,
          metralhadoras, tow, etc.
        </li>
        <li>
          O raio de uma FOB é de 400 m, marcado no mapa um círculo de cor
          branca. Não poderá ser colocada outra FOB no limite do raio.
        </li>
        <li>
          As construções e armamentos só podem ser colocadas no raio do círculo
          de cor azul.
        </li>
      </lu>
    </div>

    <h6 class="doc-heading doc-h2">Estratégias</h6>
    <h6 class="doc-heading doc-h2">Defesa</h6>
    <div class="text-body2 text-justify" ref="stra">
      <lu>
        <li>
          No modo de jogo RAAS e Invasion, recomenda-se colocar pelo menos duas
          FOBs (rádios) e duas HABs. Se uma ficar bloqueada e/ou cair, haverá
          outra de backup para o time dar respawn e defender a posição.
        </li>
        <li>
          Análise bem a posição da FOB e marque no mapa a sua intenção para que
          outros líderes possam visualizar o local onde você pretende colocar e
          um não atrapalhar o outro.
        </li>
        <li>
          Sempre que puder, evite colocar a FOB (rádio) "dentro" da bandeira
          pelos seguintes motivos: a FOB/HAB de backup ficará longe e o time
          demorará para entrar na área caso a bandeira comece a cair; geralmente
          uma artilharia é enviada na área de bandeira.
        </li>
        <li>
          Sempre esconda a posição da FOB (rádio). Se colocar num campo aberto
          e/ou encima de construção, fica fácil o inimigo visualizar pelo drone
          ou helicóptero, podendo a mesma ser danificada com morteiro, veículos
          ou artilharia.
        </li>
        <li>
          Sempre tente colocar a HAB longe do rádio como dentro de construções
          e/ou abaixo de árvores. Se o inimigo encontrar a HAB, ele ainda
          tentará encontrar o rádio e o seu time ainda terá algum tempo para
          eliminar o inimigo.
        </li>
        <li>
          Peça para alguém do seu esquadrão colocar o caminhão de suprimentos
          longe do rádio, de preferência bem escondido, para evitar que inimigo
          encontre-o e informe que há alguma FOB na região.
        </li>
      </lu>
    </div>
    <h6 class="doc-heading doc-h2">Ataque</h6>
    <div class="text-body2 text-justify" ref="stra">
      <lu>
        <li>
          Antes de atacar, verifique com outros líderes quem vai atacar e se
          algum esquadrão ficará na defesa.
        </li>
        <li>
          Se houver apenas uma HAB na defesa, recomenda-se criar outra para
          depois tentar o ataque.
        </li>
        <li>
          Se o time tiver menos de 100 ticket's, analise se vale a tentativa de
          um ataque. Muitas partidas o time que aparentemente está vencendo
          acaba perdendo por tentativas fracassadas de ataque.
        </li>
        <li>
          Análise a posição da HAB de ataque e marque no mapa. HAB muito longe
          difilculta a entrada dos aliados na área de bandeira. HAB muito
          próxima fica fácil o inimigo encontrar.
        </li>       
      </lu>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SL',

  data() {
    return {};
  },

  methods: {
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo(0, top);
    },
  },
});
</script>
