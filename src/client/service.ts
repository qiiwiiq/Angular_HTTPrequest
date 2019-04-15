declare var angular: any;
namespace myApp {
    export class myService {
        static $inject = ['$http', '$q'];

        constructor( private $http: ng.IHttpService,
                     private $q: ng.IQService
        ) {
        }

        getTableFields = () => {
            // get http://localhost:3000/Fields
            return this.$http
                .get("http://localhost:3000/Fields")
                .then( data => data )
                .catch(error => error);
        }

        getTableData = () => {
            // get http://localhost:3000/Data
            return this.$http
                .get("http://localhost:3000/Data")
                .then( data => data )
                .catch(error => error );
        }

        deleteTableData = (id) => {
            // delete http://localhost:3000/Data/{id}
            return this.$http
            .delete(`http://localhost:3000/Data/${id}`);
        }

        addTableData = (data) => {
            // post http://localhost:3000/Data
            return this.$http
            .post("http://localhost:3000/Data", {
                "Number" : data.number,
                "Name" :data.name,
                "Phone" : data.phone,
                "Address" : data.address,
                "Note": data.note
            });
        }

        updateTableData = (id, data) => {
            // put http://localhost:3000/Data/{id}
            return this.$http
            .put(`http://localhost:3000/Data/${id}`, data);
        }
    }

    angular.module("myApp")
        .service("myService", myService);
}