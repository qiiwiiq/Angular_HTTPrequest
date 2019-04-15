declare var angular: any;
namespace myAPP {
    import myService = myApp.myService;
    angular.module("myApp", []);

    export class myCtrl {
        static $inject = ['$scope', '$q', '$window', 'myService'];

        constructor(private $scope: any,
                    private $q: ng.IQService,
                    private $window: any,
                    private myService: any
        ) {
            // 表單初始化
            $scope.model = {
                "number": '',
                "name": '',
                "phone": '',
                "address": '',
                "note": ''
            };

            // 列表資料初始化
            $scope.table = {};

            // 列表選定 item 初始化
            $scope.item = '';


            // 撈出資料庫資料，存在 $scope.table 裡
            function getData(){ $q.all([myService.getTableFields(), myService.getTableData()])
                .then(data => {
                    $scope.table = data;
                    $scope.table.label = $scope.table[0].data;
                    $scope.table.memberData = $scope.table[1].data;
                })
                .catch(err => console.log(err));
            }

            getData();

            // 新增資料
            $scope.add = () => {
                // 撈出 table 最後一筆資料索引，用來取得新會員編號
                let index = $scope.table.memberData.length;
                let number = 'A' + (Number($scope.table.memberData[index-1].Number.substring(1)) + 1);
                $scope.model.number = number;              
                
                myService.addTableData($scope.model)
                .then(() => {
                    console.log('新增一筆資料');

                    // 更新 $scope.table 資料
                    getData();

                    // 清空表單
                    $scope.model = {
                        "number": '',
                        "name": '',
                        "phone": '',
                        "address": '',
                        "note": ''
                    };
                    
                })
                .catch(err => console.log(err));
            }

            // 清空表單
            $scope.rest = () => {
                $scope.model = {
                    "number": '',
                    "name": '',
                    "phone": '',
                    "address": '',
                    "note": ''
                };
            }



            // 編輯資料
            $scope.edit = (e) => {
                $scope.item = e.target.value;
            }

            // 儲存編輯資料
            $scope.saveEdit = (key, e) => {
                $scope.item = '';
                let id = e.target.value;
                let data = $scope.table.memberData[key];
                myService.updateTableData(id, data)
                .then(() => {
                    alert('更新成功');
                    // 更新 $scope.table 資料
                    getData();
                });
               
            }

            // 取消編輯資料
            $scope.cancelEdit = () => {
                $scope.item = '';
                // 更新 $scope.table 資料
                getData();
            }


            // 刪除資料
            $scope.delete = (e) => {
                console.log('刪除一筆資料')
                myService.deleteTableData(e.target.value)
                .then(()=> {
                    // 更新 $scope.table 資料
                    getData();
                });
            }
        }
    }

    angular.module("myApp").controller("myCtrl", myCtrl);
}
