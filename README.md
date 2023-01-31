# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

<!-- ### realtime
B1: Cài đặt signalR ( index js) npm i @aspnet/signalr
 import * as signalR from '@aspnet/signalr';

 export const connection = new signalR.HubConnectionBuilder().withUrl('https://movienew.cybersoft.edu.vn/DatVeHub').configureLogging(signalR.LogLevel.Information).build()

connection.start().then(function () {
  const root = ReactDOM.createRoot(document.getElementById("root"));
   root.render(
      <React.StrictMode>
     <Provider store={store}>
       <App />
     </Provider>
      </React.StrictMode>
   );

   reportWebVitals();
 }).catch(error=>{
   console.log("error: ", error);

 })


 B2: Cài đặt hàm lắng nghe sự kiện nơi cần
 import { connection } from "../..";
   
useEffect(()=>{
    -vừa vào trang load lên luôn ghê ng khác đang đặt
    connection.invoke('loadDanhSachGhe',maLichChieu)
 
   connection.on('load',(dsGheKhachDat)=>{
           console.log("dsGheKhachDat: ", dsGheKhachDat);
 
             dsGheKhachDat: laf mảng be trả về mảng khách đang đặt

       - loại mình ra khỏi danh sách
               dsGheKhachDat = dsGheKhachDat.filter(item=>item.taiKhoan !==userLogin.taiKhoan)

        - gộp danh sách ghế khách đặt  ở tất cả user thành 1 mảng chung
           let arrGheKhachDat = dsGheKhachDat.reduce((result,item,index)=>{
            let arGhe = JSON.parse(item.danhSachGhe)
                return [...result,...arrGhe]

                    },[])
            arGhe = _.unigBy(arrGheKhachDat,'maGhe) - lọc k trùng nhau
        
        - dispatch(checkGhe(arrGheKhachDat)) => hành động trong effect gửi dispatch lên store => store thay đổi(datVeReducer) danhSachGheDangDat = arrGheKhachDat ( là action.payload)
                    })
      
}

 -cai dặt sự kiện reload trang ( trong useEffect)
            window.addEventListener('bẻoeunload",)

      return ()=>{
      clearGhe();
      window.removeEventListener('bẻoeunload',clearGhe)

 },[])useEffect

  ngoài useEfect :
    const clearGhe = function(even){
       connection.invoke('huyDat',userLogin.taiKhoan.maLichChieu)
}



 B3: cài đặt nút đặt ghế=> gửi tín hiệu đến server=> server phát tín hiệu về cho tất cả client( ở bước 2)

 - action: async (dispatch,getState)=>{
    await dispatch datGhe len reducer  
  call api về BE (QuanLyDatVeReducer.js file ) -lấy đủ data Be yêu cầu => dựa vào getState
 + let dsGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat   //lay tu kho tong ve dua vao getState()
 + let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan   //lay tu kho tong ve dua vao getState()
 -call api signalr
 + connection.invok('datGhe',taiKhoan,danhSachGhe,maLichChieu)
 } 
 -->
