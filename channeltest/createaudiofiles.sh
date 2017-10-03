#!/bin/bash

# delete all previous files
rm *ch*

# create the 16 channels
for i in {1..16}
do
  ffmpeg -f lavfi -i "sine=frequency=${i}00:sample_rate=48000:duration=10" -c:a pcm_s16le "16ch-${i}.wav"
done

# create multichannel files
cp 16ch-1.wav 1ch.wav # the 1ch file doesn't need merging
for i in {2..16}
do
  cmd="ffmpeg"
  mapping=""
  for ch in $(seq 1 $i)
  do
    ch0=$((ch-1))
    cmd="${cmd} -i 16ch-${ch}.wav"
    mapping="${mapping}[${ch0}:0]"
  done
  cmd="${cmd} -filter_complex \"${mapping} amerge=inputs=${i}\""
  eval "$cmd ${i}ch.wav"
done

# delete channel source files
rm 16ch-*.wav

# remove empty wav files (of unsupported channel number)
find . -type f -empty -delete

# then encode them to ogg, mp3, aac w/o and w/ mp4 container
for file in *.wav; do
	filename="${file%.*}"
	echo "${file} ${filename}.ogg"
    ffmpeg -i ${file} ${filename}.ogg
    # ffmpeg -i ${file} ${filename}.mp3 # mp3 supports max 2 channels (except mp3 surround extension)
    ffmpeg -i ${file} -strict -2 ${filename}.aac
done

for file in *.wav; do
	filename="${file%.*}"
	# ffmpeg -i ${filename}.wav -c:a copy ${filename}-wav.mp4 #mp4 cannot carry wav
    ffmpeg -i ${filename}.ogg -c:a copy ${filename}-ogg.mp4
    # ffmpeg -i ${filename}.mp3 -c:a copy ${filename}-mp3.mp4
    ffmpeg -i ${filename}.aac -c:a copy -bsf:a aac_adtstoasc ${filename}-aac.mp4
done

# remove empty audio files (of unsupported channel number)
find . -type f -empty -delete
