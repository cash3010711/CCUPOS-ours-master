# CCUPOS

## Quick Start

這是客戶點餐時的 POS 系統

### Install

```
yarn
```

### 在本機測試

```
yarn start
```

### 產生實際執行檔

```
yarn run build:prod
```

執行完後目錄底下會出現 dist/

### 部署到 Firebase

```
firebase login
firebase deploy
```

## 各種流程以及指令介紹

### 安裝 python 環境流程

1. 在環境中安裝 miniconda

2. 使用 Anaconda prompt 在 conda 建立 python2 的環境，輸入 ```conda create -n py2 python=2```

3. 將 python 啟動，輸入 ```activate py2```

4. 輸入 ```npm rebuild node-sass```

(到這一步就表示環境安裝完成!)

### 修改程式流程

4. 每次在開始寫程式前要先輸入```git pull```將別人更新的程式下載下來

5. 輸入 ```yarn```

6. 如果修改程式後要測試程式輸入 ```yarn start```

### 上傳正式版本至 Firebase

7. 輸入 ```yarn run build:prod```，讓程式匯出一個dist的資料夾

8. 登入要上傳的 firebase，輸入 ```firebase login```

9. 將程式上傳，輸入 ```firebase deploy```

10. 輸入 ```firebase use default```
(如果位置不對，要去 .firebaserc 中修改 default:projectId 的名稱)

(當程式更新至 firebase 後，就要將 github 的內容更新至最新的)

### 將修改後的 code 更新到 github 上的流程

11. 輸入 ```git status```，如果結果是綠色就表示檔案存在可以準備 push 上去
  如果結果是紅色就輸入 ```git add .```然後再檢查一次 ```git status```

12. 輸入 ```git commit -m "修改了什麼檔案內容"```

13. 登入要上傳的地方

14. 輸入 ```git push```將檔案上傳至 github

## Trouble Shooting

### 在```yarn```時編譯 node-sass 套件出現問題怎麼辦?

#### Windows解法

以系統管理員身分，開啟 powershell，下以下指令安裝 window-build-tools

```
npm install --global --production windows-build-tools
```

接著回到此專案之目錄，用 miniconda 或 anaconda 啟動 python2 的環境，最後重新```yarn```試試看能否成功編譯 node-sass

如果以上方法不行就試試看以下指令

```
npm rebuild node-sass
```

#### Linux解法

只能下下看以下指令了

```
npm rebuild node-sass
```
