/*configuraciones para el proyecto
    punto de entrada 
    hacia donde va enviar la compilacion del proyecto 
    extensiones que va estar trabajando
*/

const path = require('path'); //elemento disponible n node
const HtmlWebpackPlugin = require('html-webpack-Plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry : './src/index.js', //punto de entrada de la aplicacion
    output : {
      path : path.resolve(__dirname, 'dist'),   //hacia donde vamos lo que va preparar webpack
      filename: '[name].[contenthash].js', //resultante del js que se va unificar
      assetModuleFilename: "assets/images/[hash][ext][query]",
    },
    mode: 'development',
    watch: true,
    resolve : { //que extensiones
        extensions : ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),

        }
    },
    module:{
        rules:[
            {
                test: /\.m?js$/,  //cualquier archivo con la extension .m o .js
                exclude : /node_modules/, //excluir los archivos de node_modules
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [  MiniCssExtractPlugin.loader,
                        'css-loader',
                        'stylus-loader'
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use:{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "../assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'  ///public/index.html va ejecutar y lo va poner en la carpeta dist con el nombre qe se define aqu
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({//elementosa que se van a utilizar, desde donde y hacia donde se va mover
            patterns: [{
                from: path.resolve(__dirname, "src", "assets/images"),
                to: "assets/images"
            }]
        }),
        new Dotenv()
    ]
    
};
