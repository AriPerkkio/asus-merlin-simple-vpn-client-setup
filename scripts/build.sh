mkdir -p build
rm -rf ./build/**

(cd packages/api ; yarn build ; cp dist/* ../../build/)

(cd packages/ui ; yarn build ; cp -R build ../../build/ui)
