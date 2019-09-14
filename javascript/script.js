var selector;
        var text;
        var title;
        window.onload = function() {
            category();
            product();
            brand();
        }
        
        function category(event) {
            selector = document.getElementById('selCat');
            text = selector[selector.selectedIndex].text;
            if(text == "Food"){
                document.getElementById("product0").textContent = "Cereal"; 
                document.getElementById("product1").textContent = "Milk"; 
            } else {
                document.getElementById("product0").textContent = "T-Shirt"; 
                document.getElementById("product1").textContent = "Pants";
            }
            product();
        }
        
        function product(event) {
            selector = document.getElementById('selProd');
            text = selector[selector.selectedIndex].text;
            if(text == "T-Shirt"){
                document.getElementById("brand0").textContent = "Armani"; 
                document.getElementById("brand1").textContent = "Prada";
            } else if(text == "Pants") {
                document.getElementById("brand0").textContent = "Adidas";
                document.getElementById("brand1").textContent = "Nike";
            } else if(text == "Cereal") {
                document.getElementById("brand0").textContent = "Kellogs";
                document.getElementById("brand1").textContent = "Froot Loops"; 
            } else if(text == "Milk") {
                document.getElementById("brand0").textContent = "Organic Valley";
                document.getElementById("brand1").textContent = "Dairyland";
            }
            brand();
        }

        var allBars = {
            "Armani": [1,2,3,4],
            "Prada": [3,5,2,10],
            "Adidas": [33,51,23,11],
            "Nike": [13,21,33,31],
            "Kellogs": [15,27,38,30],
            "Froot Loops": [25,17,38,40],
            "Organic Valley": [11,9,20,4],
            "Dairyland": [22,30,15,5]
        }

        var months = ['January','February','March','April'];

        var colors = ['#4285F4','#DB4437','#F4B400','#0F9D58']
        
        var bars = [
        ['Month', 'Sales'],
        ["January", 0],
        ["February", 0],
        ["March", 0],
        ["April", 0],
        ];
        
        function brand(event) {
            selector = document.getElementById('selBrand');
            text = selector[selector.selectedIndex].text;
            title = `Sales by Month for: ${text}`;

            values = allBars[text];

            if (values !== undefined) {
                bars = [];

                bars.push(['Month','Sales',{role:'style'}]);
                
                for (let i = 0; i < months.length; i++) {
                    bars.push([months[i],values[i],colors[i]]);
                }

                console.log(bars);
            
                plot(bars,title);
            } 
        }
        function plot(bars, title){
            google.charts.load('current', {packages: ['corechart', 'bar']});
            google.charts.setOnLoadCallback(drawStuff);
            function drawStuff() {
                var data = new google.visualization.arrayToDataTable(bars);
                var options = {
                    title: title,
                    height: 400,
                    width: 600,
                    legend: { position: 'none' },
                    is3D:true,
                    axes: {
                        x: {
                            0: { side: 'bottom', label: ' '} // Top x-axis.
                        }
                    },
                    bar: { groupWidth: "90%" }
                };

                var chart = new google.visualization.ColumnChart(document.getElementById('top_x_div'));
                chart.draw(data, options);
            }
        }