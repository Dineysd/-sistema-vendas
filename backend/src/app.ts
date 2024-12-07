// src/app.ts
import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes';

// Configurações do dotenv
dotenv.config();

class App {
    public express: Express;

    public constructor() {
        this.express = express();
        this.middleware();
        this.database();
        this.routes();
    }

    private middleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(cors());
    }

    private database(): void {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:admin123@mongodb:27017/salesdb?authSource=admin';
        
        mongoose.connect(MONGODB_URI)
            .then(() => {
                console.log('Successfully connected to MongoDB.');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
                process.exit(1);
            });

        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });
    }

    private routes(): void {
        this.express.get('/', (_req, res) => {
            res.send('API do Sistema de Vendas está funcionando!');
        });

        // Rotas dos módulos
        this.express.use('/api/products', productRoutes);
    }
}

export default new App().express;