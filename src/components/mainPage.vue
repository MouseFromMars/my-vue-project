<template>
  <div>
    <!-- Босс -->
    <div class="boss container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div
            @click="isSelectingTarget && selectTarget('boss')"
            class="boss-icons"
            id="boss"
          ></div>
          <div class="boss-hp" id="boss-hp">HP: {{ boss.hp }}</div>
          <div class="boss-mp" id="boss-mp">MP: {{ boss.mp }}</div>
        </div>
      </div>
    </div>

    <!-- Персонажи -->
    <div class="persones container-fluid">
      <div class="row">
        <!-- Персонаж-1 -->

        <div class="col-md-4">
          <div class="person">
            <div
              class="person-icons"
              id="person-Warrior"
              :style="{ backgroundImage: 'url(' + persons[0].image + ')' }"
              @click="isSelectingTarget && selectTarget('Warrior')"
            ></div>
            <div class="person-hp">HP: {{ persons[0].hp }}</div>
            <div class="person-mp">MP: {{ persons[0].mp }}</div>

            <button
              class="atack-button"
              v-if="currentTurn === 'player' && persons[0].hasActed === false"
              @click="startSelectingTarget('Warrior')"
              @mousemove="descriptionSkill_1 = true"
              @mouseleave="descriptionSkill_1 = false"
            ></button>
            <div class="skill-description" v-if="descriptionSkill_1">
              Обычная атака, наносит {{ persons[0].attackPower }} урона
            </div>
          </div>
        </div>

        <!-- Персонаж-2 -->

        <div class="col-md-4">
          <div class="person">
            <div
              class="person-icons"
              id="person-Mage"
              :style="{ backgroundImage: 'url(' + persons[1].image + ')' }"
              @click="isSelectingTarget && selectTarget('Mage')"
            ></div>
            <div class="person-hp">HP: {{ persons[1].hp }}</div>
            <div class="person-mp">MP: {{ persons[1].mp }}</div>

            <button
              class="atack-button"
              v-if="currentTurn === 'player' && persons[1].hasActed === false"
              @click="startSelectingTarget('Mage')"
              @mousemove="descriptionSkill_2 = true"
              @mouseleave="descriptionSkill_2 = false"
            ></button>
            <div class="skill-description" v-if="descriptionSkill_2">
              Обычная атака, наносит {{ persons[1].attackPower }} урона
            </div>
          </div>
        </div>

        <!-- Персонаж-3 -->

        <div class="col-md-4">
          <div class="person">
            <div
              class="person-icons"
              id="person-Rogue"
              :style="{ backgroundImage: 'url(' + persons[2].image + ')' }"
              @click="isSelectingTarget && selectTarget('Rogue')"
            ></div>
            <div class="person-hp">HP: {{ persons[2].hp }}</div>
            <div class="person-mp">MP: {{ persons[2].mp }}</div>

            <button
              class="atack-button"
              v-if="currentTurn === 'player' && persons[2].hasActed === false"
              @click="startSelectingTarget('Rogue')"
              @mousemove="descriptionSkill_3 = true"
              @mouseleave="descriptionSkill_3 = false"
            ></button>
            <div class="skill-description" v-if="descriptionSkill_3">
              Обычная атака, наносит {{ persons[2].attackPower }} урона
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Выбор цели -->
    <div v-if="isSelectingTarget == true">
      <h3>Выберите цель для атаки:</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boss: {
        hp: 1000,
        mp: 50,
      },
      persons: [
        {
          name: "Warrior",
          hp: 120,
          mp: 30,
          hasActed: false,
          attackPower: 20,
          image:
            "https://cdn.culture.ru/images/e682f2a7-6f0e-574c-8a89-9569e024fe18",
        },

        {
          name: "Mage",
          hp: 60,
          mp: 40,
          hasActed: false,
          attackPower: 5,
          image: "https://proza.ru/pics/2023/05/08/921.jpg",
        },
        {
          name: "Rogue",
          hp: 70,
          mp: 50,
          hasActed: false,
          attackPower: 10,
          image:
            "https://i.pinimg.com/736x/0f/a5/0f/0fa50fee70b915298ce5b8cc743b5752.jpg",
        },
      ],

      currentTurn: "player", // "player" или "boss"
      isSelectingTarget: false,
      activePerson: null,

      descriptionSkill_1: false,
      descriptionSkill_2: false,
      descriptionSkill_3: false,
    };
  },


  methods: {
    startSelectingTarget(name) {
      this.isSelectingTarget = true;
      this.activePerson = this.persons.find((person) => person.name === name); // Найти объект персонажа
      console.log("сработал startSelectingTarget -- " + name);
      console.log(this.activePerson);
    },

    selectTarget(target) {
      console.log(target);
      if (this.currentTurn === "player" && this.activePerson) {
        if (target === "boss") {
          this.boss.hp -= this.activePerson.attackPower; // Урон по боссу
        } else {
          const targetPerson = this.persons.find(
            (person) => person.name === target
          );
          if (targetPerson) {
            targetPerson.hp -= this.activePerson.attackPower; // Урон по целевому персонажу
          }
        }
        this.activePerson.hasActed = true; // Устанавливаем, что персонаж уже действовал
        this.isSelectingTarget = false; // Завершаем выбор цели

        if (this.persons.every(person => person.hasActed)) {
    this.endPlayerTurn(); // Завершаем ход игрока
  }
      }
    },

    endPlayerTurn() {
      this.currentTurn = "boss";
      this.persons.forEach((person) => (person.hasActed = false));
      this.bossTurn();
    },
    bossTurn() {
      // Босс выбирает случайную цель
      const alivePersons = this.persons.filter((person) => person.hp > 0);
      if (alivePersons.length > 0) {
        const randomIndex = Math.floor(Math.random() * alivePersons.length);
        alivePersons[randomIndex].hp -= 15; // Урон от босса
      }

      // Ход возвращается игроку
      this.currentTurn = "player";
    },
  },
};
</script>

<style scoped>
.boss {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}

.boss-icons {
  height: 300px;
  width: 400px;
  background-color: brown;
  border: 1px solid black;
  cursor: pointer;
  background-image: url("https://sun9-22.userapi.com/impg/501ZV4uduYLzJJdhCHLFGeAF9cmdNkTZP-5KiA/wEbHhzJCR0g.jpg?size=604x438&quality=96&sign=2f09ca288464434c65d3c90406c009fe&type=album");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.boss-hp {
  background-color: rgba(2, 255, 31, 0.58);
  height: 30px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  text-align: center;
}
.boss-mp {
  background-color: rgba(0, 0, 255, 0.656);
  height: 30px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  text-align: center;
}

/* Стили для персонажей  */

.persones {
  margin-top: 100px;
}

.person {
  width: 250px;
  margin-left: auto;
  margin-right: auto;
}

.person-icons {
  height: 250px;
  background-color: rgb(42, 132, 165);
  border: 1px solid black;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.person-hp {
  background-color: rgba(2, 255, 31, 0.58);
  height: 30px;
  border: 1px solid black;
  text-align: center;
}
.person-mp {
  background-color: rgba(0, 0, 255, 0.656);
  height: 30px;
  border: 1px solid black;
  text-align: center;
}

.atack-button {
  height: 50px;
  width: 50px;
  background-image: url("https://c1.klipartz.com/pngpicture/895/398/sticker-png-roblox-logo-sword-line-thumbnail.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.skill-description {
  margin-top: 20px;
  border-bottom: 1px solid black;
  padding-top: auto;
  padding-bottom: auto;
}

.crosshair {
  cursor: crosshair;
}

/* Анимация при атаке */

@keyframes attackAnimation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px); /* Поднимаем иконку вверх на 10 пикселей */
  }
  100% {
    transform: translateY(0); /* Возвращаем иконку на место */
  }
}

.person-icons {
  transition: transform 0.2s; /* Плавный переход для анимации */
}
</style>
