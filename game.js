function Game() {

    const PRICES = {
        BUILDING: 100,
        CITY: 1000
    };

    const MULT = {
        CITIZENS_PER_BUILDING: 0.1,
        MONEY_PER_CITIZEN: 0.2,
        MONEY_PER_CITY: 0.1
    };

    let status = {
        money: 1000,
        citizens: 0,
        buildings: 0,
        cities: 0
    };
    loadSave();

    function update() {
        status.citizens += status.buildings * MULT.CITIZENS_PER_BUILDING;
        if (status.citizens > status.buildings * 10)
            status.citizens = status.buildings * 10;

        status.money += status.citizens * MULT.MONEY_PER_CITIZEN * (1 + MULT.MONEY_PER_CITY * status.cities);

        console.log(`Updating...`);
    }

    function render() {
        document.getElementById('money').innerHTML = status.money;
        document.getElementById('buildings').innerHTML = status.buildings;
        document.getElementById('citizens').innerHTML = status.citizens;
        document.getElementById('cities').innerHTML = status.cities;
    }

    function loadSave() {
        console.log(`Loading save...`);;
        if (localStorage.getItem("city_save.version") === "0.1") {
            console.log(`Savegame found`);
            let save = JSON.parse(localStorage.getItem("city_save"));
            status.money = save?.money;
            status.citizens = save?.citizens;
            status.buildings = save?.buildings;
            status.cities = save?.cities;
        }
    }


    setInterval(() => {
        update()
    }, 1000);

    setInterval(() => {
        render()
    }, 200);

    setInterval(() => {
        localStorage.setItem("city_save", JSON.stringify(status));
        localStorage.setItem("city_save.version", "0.1");
        console.log(`Game saved!`);
    }, 10000);

    return {
        
        addBuilding: () => {
            console.log(`Adding building...`);
            if (status.money > PRICES.BUILDING) {
                status.buildings++;
                status.money -= PRICES.BUILDING;
            }
        },

        addCity: () => {
            console.log(`Found city`);
            if (status.money > PRICES.CITY && (status.buildings - (status.cities * 100)) > 100) {
                status.money -= PRICES.CITY;
                status.cities += 1;
            }
        }
    }
}