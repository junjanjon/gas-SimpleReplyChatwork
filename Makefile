
clasp_login:
	clasp login

clasp_create_sheet:
	clasp create --title "SimpleReply" --type sheets --rootDir ./dist

init:
	npm install

deploy:
	npm run deploy
