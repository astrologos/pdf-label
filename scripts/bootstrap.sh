#! /bin/bash
conda init
conda create -n annotate-studio nodejs python pip --yes --yes
conda activate annotate-studio 
npm installnpm 